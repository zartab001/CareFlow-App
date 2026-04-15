"use client"

import { XIcon } from "lucide-react"
import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const chipVariants = tv({
  base: "inline-flex max-w-full items-center gap-1 rounded-md border border-transparent px-2 py-0.5 text-[11px] font-semibold leading-4",
  variants: {
    tone: {
      neutral: "bg-cf-surface-muted text-cf-ink-60",
      success: "bg-brand-50 text-brand-700",
      info: "bg-cf-blue-50 text-[#2258A6]",
      warning: "bg-cf-amber-50 text-[#916408]",
      danger: "bg-cf-red-50 text-[#A82B2B]",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

export type ChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    onDismiss?: () => void
    dismissLabel?: string
  }

function Chip({
  className,
  tone,
  onDismiss,
  dismissLabel = "Remove",
  children,
  ...props
}: ChipProps) {
  return (
    <span
      data-slot="chip"
      className={cn(chipVariants({ tone }), onDismiss && "pr-0.5", className)}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      {onDismiss ? (
        <button
          type="button"
          className="-mr-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-current opacity-70 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          aria-label={dismissLabel}
        >
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  )
}

export { Chip, chipVariants }
