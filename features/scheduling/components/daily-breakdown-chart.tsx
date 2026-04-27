"use client";

import { mockDailyBreakdown } from "../data/mock-data";
import type { DailyBreakdown } from "../types";

interface DailyBreakdownChartProps {
  data?: DailyBreakdown[];
}

const TODAY_INDEX = 2; // Wed

export function DailyBreakdownChart({ data = mockDailyBreakdown }: DailyBreakdownChartProps) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.scheduled, d.capacity)));
  const avg = Math.round(data.slice(0, 5).reduce((s, d) => s + d.scheduled, 0) / 5);
  const peak = Math.max(...data.map((d) => d.scheduled));
  const contacts = 3;

  return (
    <div className="bg-white border border-[#E4E5EA] rounded-xl p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[14px] font-bold text-[#111827]">Daily Breakdown</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-[11px] text-[#9CA3AF]">Scheduled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#DCFCE7] border border-[#86EFAC]" />
            <span className="text-[11px] text-[#9CA3AF]">Capacity</span>
          </div>
        </div>
      </div>

      {/* Numbers above bars + bars */}
      <div className="flex items-end gap-2 mb-1" style={{ height: "120px" }}>
        {data.map((d, i) => {
          const isToday = i === TODAY_INDEX;
          const scheduledPct = (d.scheduled / maxVal) * 100;
          const capacityPct = (d.capacity / maxVal) * 100;

          return (
            <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end">
              {/* Scheduled number above bar */}
              <span className={`text-[10px] font-bold mb-1 ${isToday ? "text-[#16A34A]" : "text-[#374151]"}`}>
                {d.scheduled}
              </span>
              {/* Bars side-by-side */}
              <div className="w-full flex items-end gap-0.5 flex-1">
                <div className="flex-1 flex items-end h-full">
                  <div
                    className="w-full rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      height: `${scheduledPct}%`,
                      backgroundColor: isToday ? "#16A34A" : "#22C55E",
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
                <div className="flex-1 flex items-end h-full">
                  <div
                    className="w-full rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      height: `${capacityPct}%`,
                      backgroundColor: "#DCFCE7",
                      border: "1px solid #86EFAC",
                      transitionDelay: `${i * 60 + 30}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Day labels */}
      <div className="flex gap-2 mb-5">
        {data.map((d, i) => {
          const isToday = i === TODAY_INDEX;
          return (
            <div key={d.day} className="flex-1 text-center">
              <span className={`text-[10px] font-semibold ${isToday ? "text-[#16A34A]" : "text-[#9CA3AF]"}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E4E5EA]">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Avg / Day</p>
          <p className="text-[22px] font-bold text-[#111827] mt-0.5 leading-none">{avg}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Peak Day</p>
          <p className="text-[22px] font-bold text-[#111827] mt-0.5 leading-none">{peak}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Contacts</p>
          <p className="text-[22px] font-bold text-[#EF4444] mt-0.5 leading-none">{contacts}</p>
          <p className="text-[10px] text-[#9CA3AF]">review</p>
        </div>
      </div>
    </div>
  );
}