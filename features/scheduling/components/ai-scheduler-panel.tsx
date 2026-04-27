"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AiSchedulerPanelProps {
  onOptimise?: () => void;
}

export function AiSchedulerPanel({ onOptimise }: AiSchedulerPanelProps) {
  const [loading, setLoading] = useState(false);
  const [optimised, setOptimised] = useState(false);

  const handleOptimise = () => {
    if (loading || optimised) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOptimised(true);
      onOptimise?.();
    }, 1800);
  };

  return (
    <div className="border border-[#E4E5EA] rounded-xl p-3 bg-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
          <Sparkles size={12} className="text-[#22C55E]" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#111827]">AI Smart Scheduler</p>
          <p className="text-[9px] text-[#9CA3AF]">Auto-fill unassigned visits</p>
        </div>
      </div>

      <p className="text-[10px] text-[#6B7280] mb-3 leading-relaxed">
        AI considers carer skills, patient preferences, travel distance, and Working Time Directive limits.
      </p>

      <button
        onClick={handleOptimise}
        disabled={loading}
        className={`
          w-full flex items-center justify-center gap-2 py-2 rounded-lg
          text-[11px] font-semibold transition-all duration-300 active:scale-98
          ${optimised
            ? "bg-[#F0FDF4] text-[#16A34A] border border-[#22C55E]/40"
            : "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm hover:shadow-md"
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            Optimising…
          </>
        ) : optimised ? (
          <>
            <Sparkles size={12} />
            Week Optimised ✓
          </>
        ) : (
          <>
            <Sparkles size={12} />
            Optimise Week
          </>
        )}
      </button>
    </div>
  );
}
