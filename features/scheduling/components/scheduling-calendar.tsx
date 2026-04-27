"use client";

import { mockVisits, WEEK_DAYS } from "../data/mock-data";
import { SchedulingCalendarCell } from "./scheduling-calendar-cell";
import type { Visit } from "../types";

const TIME_SLOTS = ["07:00", "08:00", "09:00", "10:00", "11:00"];
const TODAY_INDEX = 2; // Wednesday = index 2

interface SchedulingCalendarProps {
  visits?: Visit[];
  todayIndex?: number;
}

export function SchedulingCalendar({
  visits = mockVisits,
  todayIndex = TODAY_INDEX,
}: SchedulingCalendarProps) {
  const visitsByDay = WEEK_DAYS.map((_, dayIdx) =>
    visits.filter((v) => v.day === dayIdx)
  );

  return (
    <div className="flex-1 overflow-auto bg-white animate-fade-in">
      {/* Day headers */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-[#E4E5EA] sticky top-0 bg-white z-10">
        <div className="border-r border-[#E4E5EA]" />
        {WEEK_DAYS.map((day, i) => {
          const isToday = i === todayIndex;
          return (
            <div
              key={day}
              className={`px-3 py-2 text-center border-r border-[#E4E5EA] last:border-r-0 transition-colors duration-200 ${
                isToday ? "bg-[#F0FDF4]" : ""
              }`}
            >
              <p
                className={`text-[11px] font-semibold ${
                  isToday ? "text-[#16A34A]" : "text-[#6B7280]"
                }`}
              >
                {day.split(" ")[0].toUpperCase()}
              </p>
              <p
                className={`text-[13px] font-bold mt-0.5 ${
                  isToday ? "text-[#16A34A]" : "text-[#111827]"
                }`}
              >
                {day.split(" ")[1]}
              </p>
              {isToday && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Time slot rows */}
      {TIME_SLOTS.map((time, rowIdx) => (
        <div
          key={time}
          className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-[#E4E5EA] min-h-[72px]"
          style={{ animationDelay: `${rowIdx * 40}ms` }}
        >
          {/* Time label */}
          <div className="border-r border-[#E4E5EA] px-2 pt-1.5">
            <span className="text-[10px] text-[#9CA3AF] font-medium">{time}</span>
          </div>

          {/* Day cells */}
          {WEEK_DAYS.map((_, dayIdx) => {
            const isToday = dayIdx === todayIndex;
            const dayVisits = visitsByDay[dayIdx].filter(
              (v) => v.startTime >= time && v.startTime < TIME_SLOTS[rowIdx + 1] || 
                     (rowIdx === TIME_SLOTS.length - 1 && v.startTime >= time)
            );

            return (
              <div
                key={dayIdx}
                className={`border-r border-[#E4E5EA] last:border-r-0 p-1.5 transition-colors duration-150 ${
                  isToday ? "bg-[#F0FDF4]/60" : "hover:bg-[#F9FAFB]"
                }`}
              >
                {dayVisits.map((visit, vi) => (
                  <SchedulingCalendarCell
                    key={visit.id}
                    visit={visit}
                    animationDelay={rowIdx * 40 + vi * 20 + dayIdx * 10}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
