"use client";

import type { Visit } from "../types";

interface SchedulingCalendarCellProps {
  visit: Visit;
  onClick?: (visit: Visit) => void;
  animationDelay?: number;
}

export function SchedulingCalendarCell({
  visit,
  onClick,
  animationDelay = 0,
}: SchedulingCalendarCellProps) {
  const isUnassigned = visit.isUnassigned;

  return (
    <div
      onClick={() => onClick?.(visit)}
      className={`
        rounded-lg px-2.5 py-2 mb-1.5 cursor-pointer
        transition-all duration-200 hover:scale-[1.02] hover:shadow-md
        animate-fade-in
        ${isUnassigned
          ? "border border-dashed border-[#FCA5A5] bg-[#FFF5F5]"
          : `${visit.bgColor ?? "bg-[#E8F5E9]"}`
        }
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Patient name */}
      <p className={`text-[11px] font-bold leading-tight truncate ${isUnassigned ? "text-[#EF4444]" : visit.textColor ?? "text-[#2E7D32]"}`}>
        {visit.patientName}
      </p>
      {/* Time */}
      <p className={`text-[10px] leading-tight mt-0.5 ${isUnassigned ? "text-[#F87171]" : "opacity-80 " + (visit.textColor ?? "text-[#2E7D32]")}`}>
        {visit.startTime}–{visit.endTime}
      </p>
      {/* Carer */}
      <p className={`text-[10px] leading-tight mt-0.5 opacity-70 ${isUnassigned ? "text-[#F87171]" : visit.textColor ?? "text-[#2E7D32]"}`}>
        {visit.carerName}
      </p>
    </div>
  );
}