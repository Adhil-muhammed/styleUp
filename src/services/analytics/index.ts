// ─── Analytics Contracts ──────────────────────────────────────────────────────

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsUser {
  userId: string;
  traits?: Record<string, unknown>;
}

// ─── Service Stub ─────────────────────────────────────────────────────────────
// All methods are no-ops ready for SDK injection (Segment, Amplitude, Firebase, etc.)

const AnalyticsService = {
  /**
   * Track a named event with optional properties.
   * Wire an analytics SDK here (e.g., Analytics.track(event.name, event.properties)).
   */
  trackEvent(_event: AnalyticsEvent): void {
    /* SDK integration pending */
  },

  /**
   * Associate the current session with a user identity.
   * Wire an analytics SDK here (e.g., Analytics.identify(user.userId, user.traits)).
   */
  identifyUser(_user: AnalyticsUser): void {
    /* SDK integration pending */
  },

  /**
   * Reset the analytics identity on logout.
   * Wire an analytics SDK here (e.g., Analytics.reset()).
   */
  resetUser(): void {
    /* SDK integration pending */
  },
} as const;

export default AnalyticsService;
