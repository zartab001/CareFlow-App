"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles, Plus } from "lucide-react";

interface SchedulingHeaderProps {
  weekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onFilter?: () => void;
  onAiOptimise?: () => void;
  onNewVisit?: () => void;
}

export function SchedulingHeader({
  weekLabel = "This Week",
  onPrevWeek,
  onNextWeek,
  onFilter,
  onAiOptimise,
  onNewVisit,
}: SchedulingHeaderProps) {
  const [aiPulsing, setAiPulsing] = useState(false);

  const handleAiClick = () => {
    setAiPulsing(true);
    setTimeout(() => setAiPulsing(false), 600);
    onAiOptimise?.();
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E4E5EA] animate-fade-in">
      {/* Left: Title + week nav */}
      <div className="flex items-center gap-5">
        <div>
          <h1 className="text-[20px] font-bold text-[#111827] leading-tight">Scheduling</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Week of 31 Mar – 6 Apr 2024</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevWeek}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F3F4F6] text-[#9CA3AF] transition-colors duration-150"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[13px] font-semibold text-[#374151] px-2 py-1 rounded-md bg-[#F3F4F6]">
            {weekLabel}
          </span>
          <button
            onClick={onNextWeek}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F3F4F6] text-[#9CA3AF] transition-colors duration-150"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onFilter}
          className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#374151] border border-[#D1D5DB] rounded-lg bg-white hover:bg-[#F9FAFB] transition-all duration-150 active:scale-95"
        >
          <SlidersHorizontal size={14} className="text-[#6B7280]" />
          Filter
        </button>

        <button
          onClick={handleAiClick}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
            aiPulsing
              ? "bg-[#DCFCE7] border-[#22C55E] text-[#15803D]"
              : "bg-[#F0FDF4] border-[#22C55E]/50 text-[#15803D] hover:bg-[#DCFCE7]"
          }`}
        >
          <Sparkles size={14} className="text-[#22C55E]" />
          AI Optimise
        </button>

        <button
          onClick={onNewVisit}
          className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white bg-[#22C55E] rounded-lg hover:bg-[#16A34A] transition-all duration-150 active:scale-95 shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} />
          New Visit
        </button>
      </div>
    </div>
  );
}