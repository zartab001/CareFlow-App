"use client";

import { mockCarerCapacity } from "../data/mock-data";
import type { CarerCapacity } from "../types";

interface CarerCapacityChartProps {
  carers?: CarerCapacity[];
  weekLabel?: string;
}

export function CarerCapacityChart({
  carers = mockCarerCapacity,
  weekLabel = "This Week · Top 8",
}: CarerCapacityChartProps) {
  return (
    <div className="bg-white border border-[#E4E5EA] rounded-xl p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[14px] font-bold text-[#111827]">Carer Capacity</p>
        <span className="text-[11px] text-[#9CA3AF]">{weekLabel}</span>
      </div>

      <div className="space-y-3.5">
        {carers.map((carer, i) => {
          const pct = Math.min((carer.scheduledHours / carer.maxHours) * 100, 100);
          const isOver = carer.scheduledHours > carer.maxHours;

          return (
            <div
              key={carer.id}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Colored avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: carer.color }}
              >
                {carer.initials}
              </div>

              {/* Name */}
              <span className="text-[12px] font-medium text-[#374151] w-[62px] shrink-0 truncate">
                {carer.name}
              </span>

              {/* Bar track */}
              <div className="flex-1 h-[10px] bg-[#F3F4F6] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isOver ? "#F59E0B" : carer.color,
                  }}
                />
              </div>

              {/* Hours label */}
              <span
                className={`text-[11px] font-semibold shrink-0 w-[54px] text-right ${
                  isOver ? "text-[#F59E0B]" : "text-[#6B7280]"
                }`}
              >
                {carer.scheduledHours}h / {carer.maxHours}h
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}