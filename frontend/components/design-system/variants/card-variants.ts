import { cva, type VariantProps } from "class-variance-authority"

/** CareFlow `Card` — aligned with `careflow_components.html` `.card*` */
export const cardVariants = cva(
  "group/card flex flex-col gap-4 overflow-hidden text-sm text-card-foreground outline-none has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-border bg-card shadow-none ring-0",
        elevated:
          "rounded-xl border border-cf-border-light bg-card shadow-cf-md ring-0",
        interactive:
          "cursor-pointer rounded-xl border border-border bg-card shadow-none ring-0 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-cf-border hover:shadow-cf-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
        outlined:
          "rounded-xl border-2 border-primary bg-card shadow-[0_0_0_3px_rgba(26,127,86,0.12)] ring-0",
      },
      density: {
        default: "gap-4 py-4 has-data-[slot=card-footer]:pb-0",
        sm: "gap-3 py-3 has-data-[slot=card-footer]:pb-0",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
)

export type CardVariants = VariantProps<typeof cardVariants>
