"use client";

import { TrendingUp } from "lucide-react";
import type { SchedulingStats } from "../types";
import { mockStats } from "../data/mock-data";

interface SchedulingStatsBarProps {
  stats?: SchedulingStats;
}

export function SchedulingStatsBar({ stats = mockStats }: SchedulingStatsBarProps) {
  return (
    <div className="grid grid-cols-4 border-b border-[#E4E5EA] bg-white">
      {/* Visits This Week */}
      <div className="px-6 py-5 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "0ms" }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Visits This Week
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-[36px] font-bold text-[#111827] leading-none">
            {stats.visitsThisWeek.toLocaleString()}
          </span>
        </div>
        <p className="text-[12px] text-[#9CA3AF] mt-1.5">
          <span className="text-[#22C55E] font-semibold">94.2% on-time</span>
          {" · "}{stats.visitsToday} today · {stats.visitsPending} remaining
        </p>
      </div>

      {/* Unassigned */}
      <div className="px-6 py-5 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "60ms" }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#EF4444] mb-2">
          Unassigned
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-[36px] font-bold text-[#EF4444] leading-none">
            {stats.unassignedCount}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#FEE2E2] text-[#DC2626] rounded-full">
            {stats.urgentCount} urgent
          </span>
        </div>
        <p className="text-[12px] text-[#9CA3AF] mt-1.5">
          {stats.unassignedToday} today · {stats.unassignedWeek} this week
        </p>
      </div>

      {/* Carers Available */}
      <div className="px-6 py-5 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "120ms" }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Carers Available
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-[36px] font-bold text-[#111827] leading-none">
            {stats.carersAvailable}
          </span>
          <span className="text-[14px] text-[#9CA3AF] font-medium">of {stats.carersTotal}</span>
        </div>
        <p className="text-[12px] text-[#9CA3AF] mt-1.5">3 to More · 1 less</p>
      </div>

      {/* Utilisation Rate */}
      <div className="px-6 py-5 animate-slide-up" style={{ animationDelay: "180ms" }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Utilisation Rate
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-[36px] font-bold text-[#111827] leading-none">
            {stats.utilizationRate}
          </span>
          <span className="flex items-center gap-1 text-[13px] font-semibold text-[#22C55E]">
            <TrendingUp size={13} />
            {stats.utilizationChange}
          </span>
        </div>
        <p className="text-[12px] text-[#9CA3AF] mt-1.5">
          Target: 85% · Avg: nearly 18 min
        </p>
      </div>
    </div>
  );
}