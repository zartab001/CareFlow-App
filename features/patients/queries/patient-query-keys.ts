/**
 * TanStack Query key factory for patients — use with `useQuery` / `prefetchQuery`
 * and invalidate after mutations.
 */
export const patientKeys = {
  all: ["patients"] as const,
  detail: (id: string) => [...patientKeys.all, "detail", id] as const,
};
