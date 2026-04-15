import { tv, type VariantProps } from "tailwind-variants"

/** Cards — radii/padding from design system (16px default, 12px sm) */
export const cardVariants = tv({
  base: "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
  variants: {
    padding: {
      default: "p-8",
      comfortable: "p-5",
      compact: "p-4",
    },
    interactive: {
      false: "",
      true: "transition-shadow duration-150 ease-out hover:shadow-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    },
  },
  defaultVariants: {
    padding: "comfortable",
    interactive: false,
  },
})

export type CardVariants = VariantProps<typeof cardVariants>
