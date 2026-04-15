import * as React from "react"

import { cn } from "@/lib/utils"

export type EmptyStateProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title: string
  description?: string
  /** Primary / secondary actions */
  children?: React.ReactNode
}

function EmptyState({
  className,
  icon,
  title,
  description,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6">
          {icon}
        </div>
      ) : null}
      <h3 className="font-heading text-cf-h5 font-bold text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-[42ch] text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export { EmptyState }
