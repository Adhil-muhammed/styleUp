// ─── Environment Variable Schema ──────────────────────────────────────────────
interface Env {
  readonly API_BASE_URL: string;
  readonly APP_ENV: "development" | "staging" | "production";
}

type AppEnv = Env["APP_ENV"];

const VALID_APP_ENVS: readonly AppEnv[] = [
  "development",
  "staging",
  "production",
];

// ─── Lazy Validated Singleton ─────────────────────────────────────────────────
let _env: Env | null = null;

function validateAndBuild(): Env {
  const rawApiUrl = process.env["EXPO_PUBLIC_API_BASE_URL"];
  const rawAppEnv = process.env["EXPO_PUBLIC_APP_ENV"];

  if (!rawApiUrl) {
    throw new Error(
      "[StyleQuest] Missing required env var: EXPO_PUBLIC_API_BASE_URL\n" +
        "Create a .env file at the project root and define this variable.",
    );
  }

  const resolvedEnv: AppEnv = (VALID_APP_ENVS as readonly string[]).includes(
    rawAppEnv ?? "",
  )
    ? (rawAppEnv as AppEnv)
    : "development";

  return {
    API_BASE_URL: rawApiUrl,
    APP_ENV: resolvedEnv,
  };
}

// ─── Public Accessors ─────────────────────────────────────────────────────────

/**
 * Returns the validated environment configuration.
 * Throws on first call if required variables are absent.
 */
export function getEnv(): Env {
  if (_env === null) {
    _env = validateAndBuild();
  }
  return _env;
}

export const isDev = (): boolean => getEnv().APP_ENV === "development";

export const isProd = (): boolean => getEnv().APP_ENV === "production";
