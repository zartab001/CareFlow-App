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
        rounded-md px-2 py-1.5 mb-1 cursor-pointer
        transition-all duration-200 hover:scale-[1.02] hover:shadow-sm
        animate-fade-in group
        ${isUnassigned
          ? "border border-dashed border-[#FCA5A5] bg-[#FFF5F5]"
          : `${visit.bgColor || "bg-[#E8F5E9]"} border border-transparent hover:border-current/10`
        }
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <p className={`text-[10px] font-semibold leading-tight truncate ${isUnassigned ? "text-[#EF4444]" : visit.textColor || "text-[#2E7D32]"}`}>
        {isUnassigned ? "UNASSIGNED" : visit.patientName}
      </p>
      <p className={`text-[9px] leading-tight truncate mt-0.5 ${isUnassigned ? "text-[#F87171]" : "text-current opacity-70"}`}>
        {visit.startTime}–{visit.endTime}
      </p>
      {!isUnassigned && (
        <p className="text-[9px] leading-tight truncate opacity-60" style={{ color: "inherit" }}>
          {visit.carerName}
        </p>
      )}
      {isUnassigned && (
        <p className="text-[9px] text-[#F87171] truncate">{visit.carerName}</p>
      )}
    </div>
  );
}
