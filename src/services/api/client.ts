import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import { API_BASE_URL, APP_CONFIG } from "../../config/constants";
import type { ApiResponse, ApiErrorResponse } from "../../types/api";
import type { ApiError } from "../../types";

// ─── Axios Instance ────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: APP_CONFIG.REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor — Inject Bearer Token ────────────────────────────────
// Accesses the Zustand auth store imperatively to avoid React hook constraints
// and to prevent circular imports (authStore does not import from client.ts).

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Lazy import avoids circular dependency at module evaluation time
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require("../../store/authStore") as {
      useAuthStore: { getState: () => { accessToken: string | null } };
    };
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ─── Response Interceptor — Normalise Errors & Handle 401 ────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      // Lazy import — same pattern as above
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useAuthStore } = require("../../store/authStore") as {
        useAuthStore: { getState: () => { clearAuth: () => void } };
      };
      useAuthStore.getState().clearAuth();
    }

    const apiError: ApiError = {
      code: error.response?.data?.code ?? "NETWORK_ERROR",
      message:
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred.",
      statusCode: error.response?.status ?? 0,
      // exactOptionalPropertyTypes: only spread `details` when it is defined
      ...(error.response?.data?.details !== undefined && {
        details: error.response.data.details,
      }),
    };

    return Promise.reject(apiError);
  },
);

// ─── Typed Request Helpers ────────────────────────────────────────────────────

export async function get<T>(
  url: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const response = await apiClient.get<ApiResponse<T>>(url, { params });
  return response.data.data;
}

export async function post<T, B = unknown>(url: string, body: B): Promise<T> {
  const response = await apiClient.post<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function put<T, B = unknown>(url: string, body: B): Promise<T> {
  const response = await apiClient.put<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function del<T>(url: string): Promise<T> {
  const response = await apiClient.delete<ApiResponse<T>>(url);
  return response.data.data;
}

export default apiClient;
