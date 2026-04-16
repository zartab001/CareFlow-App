import { tv, type VariantProps } from "tailwind-variants"

/** Text input — aligned with `careflow_components.html` `.input*` */
export const inputVariants = tv({
  base: "w-full min-w-0 cursor-text rounded-lg border bg-transparent outline-none transition-[color,box-shadow,border-color] duration-150 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/80 disabled:opacity-60 dark:disabled:bg-input/80 md:text-sm",
  variants: {
    size: {
      sm: "h-8 px-3 text-[0.8125rem] rounded-md",
      default: "h-10 px-3.5 text-sm",
      lg: "h-11 px-3.5 text-[0.9375rem]",
    },
    state: {
      default:
        "border-input bg-background hover:border-cf-border aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/15 dark:bg-input/30 dark:hover:border-border",
      error:
        "border-destructive focus-visible:border-destructive focus-visible:ring-[3px] focus-visible:ring-destructive/15",
      success:
        "border-primary focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15",
    },
  },
  defaultVariants: {
    size: "default",
    state: "default",
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
