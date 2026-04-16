import { cva, type VariantProps } from "class-variance-authority"

/** CareFlow `<Table />` — `data` matches `careflow_components.html` `.data-table` */
export const tableVariants = cva("w-full caption-bottom", {
  variants: {
    variant: {
      data: "border-separate border-spacing-0 text-[13px]",
      minimal: "border-collapse text-sm",
    },
  },
  defaultVariants: {
    variant: "data",
  },
})

export type TableVariants = VariantProps<typeof tableVariants>
