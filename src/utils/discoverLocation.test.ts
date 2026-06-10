import * as Location from "expo-location";
import {
  getCurrentPositionWithTimeout,
  LocationFetchTimeoutError,
  mapPermissionToState,
  resolvePermissionStatus,
  type PermissionSessionFlag,
} from "./discoverLocation";

jest.mock("expo-location", () => ({
  PermissionStatus: {
    UNDETERMINED: "undetermined",
    GRANTED: "granted",
    DENIED: "denied",
  },
  Accuracy: {
    Balanced: 3,
  },
  getForegroundPermissionsAsync: jest.fn(),
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

const mockedLocation = Location as jest.Mocked<typeof Location>;

describe("discoverLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("mapPermissionToState", () => {
    it("returns fetch when permission is granted", () => {
      expect(
        mapPermissionToState(Location.PermissionStatus.GRANTED, true),
      ).toBe("fetch");
    });

    it("returns idle when permission is undetermined", () => {
      expect(
        mapPermissionToState(Location.PermissionStatus.UNDETERMINED, true),
      ).toBe("idle");
    });

    it("returns denied when denied and can ask again", () => {
      expect(mapPermissionToState(Location.PermissionStatus.DENIED, true)).toBe(
        "denied",
      );
    });

    it("returns blocked when denied and cannot ask again", () => {
      expect(
        mapPermissionToState(Location.PermissionStatus.DENIED, false),
      ).toBe("blocked");
    });
  });

  describe("getCurrentPositionWithTimeout", () => {
    it("resolves when position arrives before timeout", async () => {
      mockedLocation.getCurrentPositionAsync.mockResolvedValue({
        coords: {
          latitude: 9.05,
          longitude: 76.6,
          altitude: 0,
          accuracy: 10,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      });

      const positionPromise = getCurrentPositionWithTimeout(1000);
      await expect(positionPromise).resolves.toMatchObject({
        coords: { latitude: 9.05, longitude: 76.6 },
      });
    });

    it("rejects with LocationFetchTimeoutError when fetch is slow", async () => {
      mockedLocation.getCurrentPositionAsync.mockImplementation(
        () =>
          new Promise(() => {
            // never resolves
          }),
      );

      const positionPromise = getCurrentPositionWithTimeout(500);
      const expectation = expect(positionPromise).rejects.toBeInstanceOf(
        LocationFetchTimeoutError,
      );

      jest.advanceTimersByTime(500);
      await expectation;
    });
  });

  describe("resolvePermissionStatus", () => {
    const sessionFlag: PermissionSessionFlag = { hasRequested: false };

    beforeEach(() => {
      sessionFlag.hasRequested = false;
    });

    it("does not request twice per session for undetermined auto-request", async () => {
      mockedLocation.getForegroundPermissionsAsync
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.UNDETERMINED,
          granted: false,
          canAskAgain: true,
          expires: "never",
        })
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.GRANTED,
          granted: true,
          canAskAgain: true,
          expires: "never",
        });

      mockedLocation.requestForegroundPermissionsAsync.mockResolvedValue({
        status: Location.PermissionStatus.GRANTED,
        granted: true,
        canAskAgain: true,
        expires: "never",
      });

      await resolvePermissionStatus({
        shouldAutoRequest: true,
        allowDeniedRetryRequest: false,
        sessionFlag,
      });

      expect(
        mockedLocation.requestForegroundPermissionsAsync,
      ).toHaveBeenCalledTimes(1);
      expect(sessionFlag.hasRequested).toBe(true);

      mockedLocation.getForegroundPermissionsAsync.mockResolvedValue({
        status: Location.PermissionStatus.UNDETERMINED,
        granted: false,
        canAskAgain: true,
        expires: "never",
      });

      await resolvePermissionStatus({
        shouldAutoRequest: true,
        allowDeniedRetryRequest: false,
        sessionFlag,
      });

      expect(
        mockedLocation.requestForegroundPermissionsAsync,
      ).toHaveBeenCalledTimes(1);
    });

    it("always re-reads permission after a request", async () => {
      mockedLocation.getForegroundPermissionsAsync
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.UNDETERMINED,
          granted: false,
          canAskAgain: true,
          expires: "never",
        })
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.GRANTED,
          granted: true,
          canAskAgain: true,
          expires: "never",
        });

      mockedLocation.requestForegroundPermissionsAsync.mockResolvedValue({
        status: Location.PermissionStatus.GRANTED,
        granted: true,
        canAskAgain: true,
        expires: "never",
      });

      const result = await resolvePermissionStatus({
        shouldAutoRequest: true,
        allowDeniedRetryRequest: false,
        sessionFlag,
      });

      expect(
        mockedLocation.getForegroundPermissionsAsync,
      ).toHaveBeenCalledTimes(2);
      expect(result.status).toBe(Location.PermissionStatus.GRANTED);
    });

    it("calls onRequesting before requestForegroundPermissionsAsync when undetermined", async () => {
      mockedLocation.getForegroundPermissionsAsync
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.UNDETERMINED,
          granted: false,
          canAskAgain: true,
          expires: "never",
        })
        .mockResolvedValueOnce({
          status: Location.PermissionStatus.GRANTED,
          granted: true,
          canAskAgain: true,
          expires: "never",
        });

      const callOrder: string[] = [];
      mockedLocation.requestForegroundPermissionsAsync.mockImplementation(
        async () => {
          callOrder.push("request");
          return {
            status: Location.PermissionStatus.GRANTED,
            granted: true,
            canAskAgain: true,
            expires: "never",
          };
        },
      );

      const onRequesting = jest.fn(() => {
        callOrder.push("onRequesting");
      });

      await resolvePermissionStatus({
        shouldAutoRequest: true,
        allowDeniedRetryRequest: false,
        sessionFlag,
        onRequesting,
      });

      expect(onRequesting).toHaveBeenCalledTimes(1);
      expect(callOrder).toEqual(["onRequesting", "request"]);
    });

    it("does not call onRequesting when permission is already granted", async () => {
      mockedLocation.getForegroundPermissionsAsync.mockResolvedValue({
        status: Location.PermissionStatus.GRANTED,
        granted: true,
        canAskAgain: true,
        expires: "never",
      });

      const onRequesting = jest.fn();

      await resolvePermissionStatus({
        shouldAutoRequest: true,
        allowDeniedRetryRequest: false,
        sessionFlag,
        onRequesting,
      });

      expect(onRequesting).not.toHaveBeenCalled();
    });
  });
});
