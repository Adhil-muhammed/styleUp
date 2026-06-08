// ─── Loading / Async States ───────────────────────────────────────────────────

export type LoadingState = "idle" | "loading" | "success" | "error";

// ─── Modal ────────────────────────────────────────────────────────────────────

export enum ModalType {
  BOOKING_CONFIRMATION = "BOOKING_CONFIRMATION",
  SERVICE_DETAIL = "SERVICE_DETAIL",
  REVIEW_PROMPT = "REVIEW_PROMPT",
  XP_REWARD = "XP_REWARD",
  PROVIDER_FILTER = "PROVIDER_FILTER",
}

// ─── User Domain ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  displayName: string;
  avatarUrl: string | null;
  xpPoints: number;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  iconUrl: string;
  awardedAt: string;
}

export interface UserProfile extends User {
  bio: string | null;
  location: string | null;
  preferredServices: string[];
  badges: Badge[];
}

// ─── Service Provider Domain ──────────────────────────────────────────────────

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  currency: string;
  description: string | null;
}

export interface ServiceProvider {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  rating: number;
  reviewCount: number;
  location: string;
  services: Service[];
  avatarUrl: string | null;
}

// ─── Booking Domain ───────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  scheduledAt: string;
  status: BookingStatus;
  xpAwarded: number | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ─── Error ────────────────────────────────────────────────────────────────────

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, string[]>;
}
