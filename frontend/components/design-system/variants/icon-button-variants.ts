import { tv, type VariantProps } from "tailwind-variants"

/** Matches `careflow_components.html` `.icon-btn*` (40 / 32 / 44 px). */
export const iconButtonVariants = tv({
  base: "inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-brand-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      ghost:
        "rounded-cf-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
      outline:
        "rounded-cf-md border-border bg-background text-foreground hover:bg-muted hover:border-cf-border",
      solid:
        "rounded-cf-md bg-primary text-primary-foreground hover:bg-primary/90",
    },
    size: {
      sm: "size-8 rounded-cf-sm [&_svg]:size-3.5",
      md: "size-10 rounded-cf-md [&_svg]:size-4",
      lg: "size-11 rounded-cf-lg [&_svg]:size-[18px]",
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
})

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>
