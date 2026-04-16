/**
 * Structured tokens mirroring `careflow_design_system.html` §02–§08.
 * CSS variables in `app/globals.css` are the runtime source of truth for colour/radius/shadow;
 * this module is for TypeScript, tests, and documentation.
 */

export const careflowBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  /** Desktop grid spec (≥1440px) from design system layout section */
  cfDesktop: "1440px",
} as const

/** 12 / 8 / 4 column grids: gutters and margins from HTML */
export const careflowGrid = {
  desktop: {
    columns: 12,
    gutterPx: 24,
    marginPx: 80,
    maxContainerPx: 1280,
  },
  tablet: {
    columns: 8,
    gutterPx: 20,
    marginPx: 48,
    maxContainer: "fluid" as const,
  },
  mobile: {
    columns: 4,
    gutterPx: 16,
    marginPx: 20,
    maxContainer: "fluid" as const,
  },
} as const

/** 4px base — maps to default Tailwind spacing scale (space-1 = 4px, …). */
export const careflowSpacing = {
  "0": "0px",
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
  "20": "80px",
} as const

export const careflowTransitions = {
  fast: "120ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "300ms cubic-bezier(0.22, 1, 0.36, 1)",
} as const

export const careflowSemanticColors = {
  success: "#1A7F56",
  info: "#3574D4",
  warning: "#D4930F",
  error: "#D44040",
} as const
