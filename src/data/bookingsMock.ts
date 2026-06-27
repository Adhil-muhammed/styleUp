export type BookingAppointmentStatus = "upcoming" | "past";

export interface BookingAppointmentReminderOption {
  id: string;
  label: string;
}

export interface BookingAppointment {
  id: string;
  status: BookingAppointmentStatus;
  dateTimeLabel: string;
  shopName: string;
  address: string;
  imageUri: string;
  services: readonly string[];
  reminderEnabled: boolean;
  reminderLabel: string;
  dimmed?: boolean;
}

export const BOOKING_STATUS_OPTIONS: readonly {
  id: BookingAppointmentStatus;
  label: string;
}[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
] as const;

export const BOOKING_REMINDER_OPTIONS: readonly BookingAppointmentReminderOption[] = [
  { id: "reminder-30", label: "30 min before" },
  { id: "reminder-60", label: "1 hour before" },
] as const;

export const BOOKING_APPOINTMENTS: readonly BookingAppointment[] = [
  {
    id: "booking-jawed-habib-2021-09-12",
    status: "upcoming",
    dateTimeLabel: "12 September 2021, 08:00",
    shopName: "Jawed Habib",
    address: "6391 Elgin St. Celina, Delaware 10299",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9dfdks-dLE4_lLYuYjzRQvi-24qOX_GtgLxWmjx_IucdHMdCZaSfYWv27pGNzIt19A1uT7yZLsnEyekE684Edtqt3sjrq13EyRB679wv1s3kYO_1mQW2LU25r1VFQJ26DLO7U0qMfJX0Hi6FT45xJ2rBqD94W5BcY9LRFHRJbWXSqkYlACur883MLNy0s6hWyCJhnFq3T61GvDr_80qUv0ViffMWqBn2Ar6kKVf2IXzYyrBPTYE4sNgEV0kDPwjWT9WcGmyFtWc",
    services: ["Regular haircut", "Classic shaving"],
    reminderEnabled: true,
    reminderLabel: "30 min before",
  },
  {
    id: "booking-green-apple-2021-09-24",
    status: "upcoming",
    dateTimeLabel: "24 September 2021, 16:30",
    shopName: "Green Apple",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlI037HxHdrwYlEE7-6zMmx9d7SaBTUTdlTH_QNZiiUSYrC63EQ5puY_onmGRXH1MWP7Qh8b2gHrvvn1tfUgnghu5TrfEQBZ-4ImMjkLK4hFAAbRSWfBcap7mKkRwJor1pPcGqp21nQaHSc0l9s3BxR7lbd7VTfy445yl05jNeBgzw_n1_-LyHZsDSo-7oO_iNZMGI_-CsXCkR37YQ_fdeymW0AAKYnQUNa2ccaSGx9fbPOaQykJDc9LsOLCups1YokpgHVZHbq-c",
    services: ["Regular haircut", "Classic shaving"],
    reminderEnabled: false,
    reminderLabel: "Remind me",
  },
  {
    id: "booking-jawed-habib-past-2021-09-12",
    status: "past",
    dateTimeLabel: "12 September 2021, 08:00",
    shopName: "Jawed Habib",
    address: "6391 Elgin St. Celina, Delaware 10299",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9dfdks-dLE4_lLYuYjzRQvi-24qOX_GtgLxWmjx_IucdHMdCZaSfYWv27pGNzIt19A1uT7yZLsnEyekE684Edtqt3sjrq13EyRB679wv1s3kYO_1mQW2LU25r1VFQJ26DLO7U0qMfJX0Hi6FT45xJ2rBqD94W5BcY9LRFHRJbWXSqkYlACur883MLNy0s6hWyCJhnFq3T61GvDr_80qUv0ViffMWqBn2Ar6kKVf2IXzYyrBPTYE4sNgEV0kDPwjWT9WcGmyFtWc",
    services: ["Regular haircut", "Classic shaving"],
    reminderEnabled: false,
    reminderLabel: "Remind me",
  },
  {
    id: "booking-green-apple-past-2021-09-24",
    status: "past",
    dateTimeLabel: "24 September 2021, 16:30",
    shopName: "Green Apple",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlI037HxHdrwYlEE7-6zMmx9d7SaBTUTdlTH_QNZiiUSYrC63EQ5puY_onmGRXH1MWP7Qh8b2gHrvvn1tfUgnghu5TrfEQBZ-4ImMjkLK4hFAAbRSWfBcap7mKkRwJor1pPcGqp21nQaHSc0l9s3BxR7lbd7VTfy445yl05jNeBgzw_n1_-LyHZsDSo-7oO_iNZMGI_-CsXCkR37YQ_fdeymW0AAKYnQUNa2ccaSGx9fbPOaQykJDc9LsOLCups1YokpgHVZHbq-c",
    services: ["Regular haircut", "Classic shaving"],
    reminderEnabled: false,
    reminderLabel: "Remind me",
  },
  {
    id: "booking-the-galleria-2021-09-28",
    status: "past",
    dateTimeLabel: "28 September 2021, 20:00",
    shopName: "The Galleria",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOFSv_16tyyg54ytgizgUqf-ylK5MHb08RvamjpKOImoaRC9weQ7SraWrR3YU6Px09Uqf2tLT4fIu2sQuhAAoPeSNdwX01ahrUJVDWwBvC55VxM28L5liZB0rXeDDfnwd_V5UoaEIOOmw8mtAVOQzy8JBdY4-SP03amnprlUstG49uEGB1M-9EAcx7NyC_5FME2ZO619t1bSDQItCOqf3hcG27b-elyxUGX9kR9LhwZS9Lzc3oq6nor5-Rt2gx94Qh1l83T-us-rw",
    services: ["Regular haircut", "Classic shaving"],
    reminderEnabled: false,
    reminderLabel: "Remind me",
  },
] as const;
