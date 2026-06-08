---
name: mobile-typescript
description: Rules for robust compile-time safety, strict utility typing, and deep API payload mapping in TypeScript. Use when writing types, interfaces, service mappers, or generic layout components.
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Advanced TypeScript for Mobile Platforms

Apply these standards across all TypeScript and TSX files in StyleQuest. Reinforces the zero-`any` policy from `project-context.mdc`.

## Explicit Props Interfaces

Every React component that accepts props must declare a dedicated interface or type alias.

Forbidden:

- Props typed as generic `object`, `Record<string, unknown>`, or `{}`
- Inline destructuring types: `({ title }: { title: string })`
- Untyped props spreads: `(props)` with no annotation

Required:

- Named interface: `interface PrimaryButtonProps { ... }`
- Explicit return type on the component function
- Optional props marked with `?` and documented defaults in destructuring

```typescript
// BAD — inline object type, no named interface
const ServiceCard = ({
  provider,
  onBook,
}: {
  provider: ServiceProvider;
  onBook: (id: string) => void;
}) => { /* ... */ };

// GOOD — named interface, explicit return type
interface ServiceCardProps {
  provider: ServiceProvider;
  onBook: (serviceId: string) => void;
  highlighted?: boolean;
}

const ServiceCard = ({
  provider,
  onBook,
  highlighted = false,
}: ServiceCardProps): React.JSX.Element => {
  /* ... */
};
```

## Utility Type Composition

Derive types from canonical domain models in `src/types/index.ts` — do not duplicate field shapes across layers.

Use utility types to compose view models, partial updates, and API payloads:

| Utility | Use case |
|---------|----------|
| `Pick<T, K>` | Display-only subsets for list cards |
| `Omit<T, K>` | Forms that exclude server-managed fields |
| `Partial<T>` | Patch/update payloads |
| `Record<K, V>` | Maps keyed by ID |
| `Readonly<T>` | Immutable config objects |

```typescript
// BAD — duplicated shape diverges from domain model
interface BookingCardData {
  id: string;
  scheduledAt: string;
  status: string;
  providerName: string;
}

// GOOD — derived from canonical Booking + related types
import type { Booking, ServiceProvider } from "@/types";

type BookingCardView = Pick<Booking, "id" | "scheduledAt" | "status"> & {
  providerName: ServiceProvider["name"];
};

type BookingUpdatePayload = Partial<Pick<Booking, "scheduledAt" | "status">>;
```

## Service-Edge Payload Mapping

All API response data must be typed at the service boundary in `src/services/`.

- Generic helpers (`get<T>`, `post<T>`) from `src/services/api/client.ts` define the envelope type
- Service functions must map raw payloads to domain models using explicit mapper functions
- Validate required fields at runtime before returning — do not use blind `as User` assertions
- Mapper input type is `unknown`; narrow with field checks before constructing the domain type

```typescript
// BAD — blind assertion, no runtime validation
export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const raw = await get<unknown>(`/users/${userId}`);
  return raw as UserProfile;
}

// GOOD — validated mapper at service edge
function isUserProfile(raw: unknown): raw is UserProfile {
  if (typeof raw !== "object" || raw === null) return false;
  const obj = raw as Record<string, unknown>;
  return (
    typeof obj["id"] === "string" &&
    typeof obj["email"] === "string" &&
    typeof obj["displayName"] === "string" &&
    typeof obj["xpPoints"] === "number"
  );
}

function mapApiUserProfile(raw: unknown): UserProfile {
  if (!isUserProfile(raw)) {
    throw new Error("Invalid UserProfile payload from API");
  }
  return raw;
}

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const raw = await get<unknown>(`/users/${userId}`);
  return mapApiUserProfile(raw);
}
```

Place mappers in the service module or a co-located `mappers.ts` — never in components or stores.

## Generic Reusable Layout Component Template

Use constrained generics for polymorphic layout wrappers:

```typescript
import React from "react";
import { View, type ViewProps } from "react-native";

type StackLayoutProps<T extends React.ElementType = typeof View> = {
  as?: T;
  children: React.ReactNode;
  gap?: number;
  direction?: "row" | "column";
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "style"> & {
    style?: ViewProps["style"];
  };

const StackLayout = <T extends React.ElementType = typeof View>({
  as,
  children,
  gap = 0,
  direction = "column",
  style,
  ...rest
}: StackLayoutProps<T>): React.JSX.Element => {
  const Component = as ?? View;

  return (
    <Component
      style={[{ flexDirection: direction, gap }, style]}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StackLayout;
```

Rules for generic components:

- Constrain the polymorphic `as` prop with `React.ElementType`
- Default to a sensible primitive (`View`, `Pressable`)
- Merge props with `ComponentPropsWithoutRef<T>` and `Omit` conflicting keys
- Export the props interface for consumer type inference

## Verification Checklist

Before finishing TypeScript work:

- [ ] Every component has a named props interface and explicit return type
- [ ] View models derive from domain types via `Pick`/`Omit`/`Partial` — not duplicated
- [ ] Service functions use validated mappers — no blind `as` casts on API payloads
- [ ] No `any` anywhere in the diff
