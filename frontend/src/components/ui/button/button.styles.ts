import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center",
    "font-medium",
    "rounded-xl",
    "transition-all duration-150 ease-in-out",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],

  variants: {
    variant: {
      primary:
        "bg-green-600 text-white hover:bg-green-700 active:scale-95",

      secondary:
        "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:scale-95",

      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-200/70 active:scale-95",

      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:scale-95",
    },

    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-6 text-sm",
    },

    focused: {
      true: "ring-2 ring-green-500 ring-offset-2",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});