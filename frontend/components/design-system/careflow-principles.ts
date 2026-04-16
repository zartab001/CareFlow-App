/** Design principles from `careflow_design_system.html` §01 — use for UX reviews and copy. */
export const CAREFLOW_DESIGN_PRINCIPLES = [
  {
    id: "clarity",
    title: "Clarity over cleverness",
    summary:
      "Carers and coordinators work under pressure. Every screen must be instantly understandable with no ambiguity in what to do next.",
  },
  {
    id: "density",
    title: "Dense, not crowded",
    summary:
      "Information density is valuable in operational software. Use tight spacing and strong hierarchy to show more without overwhelming.",
  },
  {
    id: "consistency",
    title: "Consistent, not rigid",
    summary:
      "Components behave predictably across the app. Variants exist for real needs, not decoration. Consistency builds muscle memory.",
  },
  {
    id: "a11y",
    title: "Accessible by default",
    summary:
      "WCAG AA contrast, keyboard navigation, and screen reader support are baseline — not features to be added later.",
  },
] as const
