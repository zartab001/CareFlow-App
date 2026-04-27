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
    <div className="bg-white border border-[#E4E5EA] rounded-xl p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] font-semibold text-[#111827]">Carer Capacity</p>
        <span className="text-[10px] text-[#9CA3AF]">{weekLabel}</span>
      </div>

      <div className="space-y-2.5">
        {carers.map((carer, i) => {
          const pct = Math.min((carer.scheduledHours / carer.maxHours) * 100, 100);
          const isOver = carer.scheduledHours > carer.maxHours;

          return (
            <div key={carer.id} className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              {/* Avatar */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                style={{ backgroundColor: carer.color }}
              >
                {carer.initials}
              </div>

              {/* Name */}
              <span className="text-[10px] text-[#374151] w-16 shrink-0 truncate">{carer.name}</span>

              {/* Bar */}
              <div className="flex-1 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isOver ? "#F59E0B" : carer.color,
                    animationDelay: `${i * 40 + 200}ms`,
                  }}
                />
              </div>

              {/* Hours */}
              <span className={`text-[10px] font-medium shrink-0 w-12 text-right ${isOver ? "text-[#F59E0B]" : "text-[#6B7280]"}`}>
                {carer.scheduledHours}h / {carer.maxHours}h
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
