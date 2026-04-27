"use client";

import { mockDailyBreakdown } from "../data/mock-data";
import type { DailyBreakdown } from "../types";

interface DailyBreakdownChartProps {
  data?: DailyBreakdown[];
}

const BAR_COLOR = "#22C55E";
const CAPACITY_COLOR = "#DCFCE7";
const TODAY_INDEX = 2; // Wed

export function DailyBreakdownChart({ data = mockDailyBreakdown }: DailyBreakdownChartProps) {
  const maxVal = Math.max(...data.map((d) => d.capacity));

  const avg = Math.round(data.reduce((s, d) => s + d.scheduled, 0) / data.length);
  const peak = Math.max(...data.map((d) => d.scheduled));
  const contacts = 3;

  return (
    <div className="bg-white border border-[#E4E5EA] rounded-xl p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] font-semibold text-[#111827]">Daily Breakdown</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
            <span className="text-[9px] text-[#9CA3AF]">Scheduled</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#DCFCE7] border border-[#BBF7D0]" />
            <span className="text-[9px] text-[#9CA3AF]">Capacity</span>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-[100px] mb-2">
        {data.map((d, i) => {
          const isToday = i === TODAY_INDEX;
          const scheduledH = (d.scheduled / maxVal) * 100;
          const capacityH = (d.capacity / maxVal) * 100;

          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full flex items-end gap-0.5 h-full">
                {/* Scheduled bar */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-700 ease-out ${isToday ? "opacity-100" : "opacity-90"}`}
                    style={{
                      height: `${scheduledH}%`,
                      backgroundColor: isToday ? "#16A34A" : BAR_COLOR,
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
                {/* Capacity bar */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className="w-full rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      height: `${capacityH}%`,
                      backgroundColor: CAPACITY_COLOR,
                      border: "1px solid #BBF7D0",
                      transitionDelay: `${i * 60 + 30}ms`,
                    }}
                  />
                </div>
              </div>
              <span
                className={`text-[9px] font-medium ${isToday ? "text-[#16A34A]" : "text-[#9CA3AF]"}`}
              >
                {d.day}
              </span>
              <span className="text-[9px] text-[#374151] font-semibold">{d.scheduled}</span>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E4E5EA]">
        <div className="text-center">
          <p className="text-[9px] text-[#9CA3AF] uppercase tracking-wide">Avg / Day</p>
          <p className="text-[14px] font-bold text-[#111827] mt-0.5">{avg}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] text-[#9CA3AF] uppercase tracking-wide">Peak Day</p>
          <p className="text-[14px] font-bold text-[#111827] mt-0.5">{peak}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] text-[#9CA3AF] uppercase tracking-wide">Contacts</p>
          <p className="text-[14px] font-bold text-[#EF4444] mt-0.5">{contacts}</p>
          <p className="text-[8px] text-[#9CA3AF]">review</p>
        </div>
      </div>
    </div>
  );
}
