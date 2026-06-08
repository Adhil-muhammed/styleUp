// ─── Standard API Response Envelope ──────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// ─── Auth Tokens ──────────────────────────────────────────────────────────────

export interface AuthTokenPair {
  accessToken: string;
  refreshToken: string;
  /** Unix timestamp (ms) at which the access token expires */
  expiresAt: number;
}
