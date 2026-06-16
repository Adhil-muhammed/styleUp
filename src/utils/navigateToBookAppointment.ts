import { DEFAULT_PAYMENT_METHOD_ID } from "@/data/paymentMethodMock";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { resolveBarberFromShopPin } from "@/utils/mapDiscoverToBookDraft";
import type { RootStackParamList } from "@/navigation/types";
import type { BookingDraftStore } from "@/store/bookingDraftStore";

const DEFAULT_DISCOVER_SERVICE_ID = "service-1";
const DEFAULT_TIME_FILTER_ID = "schedule";
const DEFAULT_PROFILE_ID = "me";
const DEFAULT_PAYMENT_ID = DEFAULT_PAYMENT_METHOD_ID;

type SetDraftFromDiscover = BookingDraftStore["setDraftFromDiscover"];

export function navigateToBookAppointment(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setDraftFromDiscover: SetDraftFromDiscover,
  shopId: string,
): void {
  const barber = resolveBarberFromShopPin(shopId);

  setDraftFromDiscover({
    shopPinId: shopId,
    barber,
    discoverServiceId: DEFAULT_DISCOVER_SERVICE_ID,
    timeFilterId: DEFAULT_TIME_FILTER_ID,
    profileId: DEFAULT_PROFILE_ID,
    paymentId: DEFAULT_PAYMENT_ID,
  });

  navigation.navigate("BookAppointment", { shopId });
}
