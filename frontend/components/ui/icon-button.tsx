"use client"

import * as React from "react"

import {
  type IconButtonVariants,
  iconButtonVariants,
} from "@/lib/design-system/variants/icon-button-variants"
import { cn } from "@/lib/utils"

export type IconButtonProps = React.ComponentProps<"button"> &
  IconButtonVariants & {
    /** Required for accessibility when the control has no visible text */
    "aria-label": string
  }

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
