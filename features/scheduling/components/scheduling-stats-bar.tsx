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
      <div className="px-5 py-4 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "0ms" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1">
          Visits This Week
        </p>
        <div className="flex items-end gap-2">
          <span className="text-[28px] font-bold text-[#111827] leading-none">
            {stats.visitsThisWeek.toLocaleString()}
          </span>
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1">
          <span className="text-[#22C55E] font-medium">94.2% on-time</span>
          &nbsp;· {stats.visitsToday} today · {stats.visitsPending} remaining
        </p>
      </div>

      {/* Unassigned */}
      <div className="px-5 py-4 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "60ms" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1">
          Unassigned
        </p>
        <div className="flex items-end gap-2">
          <span className="text-[28px] font-bold text-[#EF4444] leading-none">
            {stats.unassignedCount}
          </span>
          <span className="mb-0.5 px-2 py-0.5 text-[10px] font-semibold bg-[#FEE2E2] text-[#DC2626] rounded-full">
            {stats.urgentCount} urgent
          </span>
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1">
          {stats.unassignedToday} today · {stats.unassignedWeek} this week
        </p>
      </div>

      {/* Carers Available */}
      <div className="px-5 py-4 border-r border-[#E4E5EA] animate-slide-up" style={{ animationDelay: "120ms" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1">
          Carers Available
        </p>
        <div className="flex items-end gap-2">
          <span className="text-[28px] font-bold text-[#111827] leading-none">
            {stats.carersAvailable}
          </span>
          <span className="mb-0.5 text-[11px] text-[#9CA3AF]">of {stats.carersTotal}</span>
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1">{stats.carersMoreLess}</p>
      </div>

      {/* Utilisation Rate */}
      <div className="px-5 py-4 animate-slide-up" style={{ animationDelay: "180ms" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1">
          Utilisation Rate
        </p>
        <div className="flex items-end gap-2">
          <span className="text-[28px] font-bold text-[#111827] leading-none">
            {stats.utilizationRate}
          </span>
          <span className="mb-0.5 flex items-center gap-0.5 text-[11px] font-semibold text-[#22C55E]">
            <TrendingUp size={11} />
            {stats.utilizationChange}
          </span>
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1">
          Target: 85% · Avg: nearly 18 min
        </p>
      </div>
    </div>
  );
}
