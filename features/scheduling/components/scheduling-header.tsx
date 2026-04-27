"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Sparkles, Plus } from "lucide-react";

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
    <div className="flex items-center justify-between px-6 py-3 border-b border-[#E4E5EA] bg-white animate-fade-in">
      {/* Left: Title + week nav */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-[15px] font-semibold text-[#111827]">Scheduling</h1>
          <p className="text-[11px] text-[#9CA3AF] mt-0.5">
            Week of 31 Mar – 6 Apr 2024
          </p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={onPrevWeek}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280] transition-colors duration-150"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[12px] font-medium text-[#374151] px-1">{weekLabel}</span>
          <button
            onClick={onNextWeek}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280] transition-colors duration-150"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Right: Filter + AI Optimise + New Visit */}
      <div className="flex items-center gap-2">
        <button
          onClick={onFilter}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#374151] border border-[#E4E5EA] rounded-lg hover:bg-[#F9FAFB] transition-all duration-150 active:scale-95"
        >
          <Filter size={13} />
          Filter
        </button>

        <button
          onClick={handleAiClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#1a6b3a] border border-[#22C55E]/40 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] transition-all duration-200 active:scale-95 ${aiPulsing ? "scale-95 bg-[#DCFCE7]" : ""}`}
        >
          <Sparkles size={13} className="text-[#22C55E]" />
          AI Optimise
        </button>

        <button
          onClick={onNewVisit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#22C55E] rounded-lg hover:bg-[#16A34A] transition-all duration-150 active:scale-95 shadow-sm"
        >
          <Plus size={13} />
          New Visit
        </button>
      </div>
    </div>
  );
}
