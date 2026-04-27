"use client";

import { useState } from "react";
import { mockPendingSwaps } from "../data/mock-data";
import type { PendingSwap } from "../types";

interface PendingSwapsPanelProps {
  swaps?: PendingSwap[];
}

function SwapAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-bold text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

export function PendingSwapsPanel({ swaps = mockPendingSwaps }: PendingSwapsPanelProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const active = swaps.filter((s) => !dismissed.includes(s.id));

  return (
    <div className="animate-fade-in">
      <p className="text-[13px] font-bold text-[#111827] mb-3">Pending Swaps</p>
      <div className="space-y-3">
        {active.map((swap, i) => (
          <div
            key={swap.id}
            className="border border-[#E4E5EA] rounded-xl p-3 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Carer swap row */}
            <div className="flex items-center gap-2 mb-1.5">
              <SwapAvatar initials={swap.fromInitials} color={swap.fromColor} />
              <span className="text-[11px] font-bold text-[#374151]">{swap.fromCarer}</span>
              <span className="text-[10px] text-[#9CA3AF] mx-0.5">⇄</span>
              <SwapAvatar initials={swap.toInitials} color={swap.toColor} />
              <span className="text-[11px] font-bold text-[#374151]">{swap.toCarer}</span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] mb-3">
              {swap.day} · {swap.shift}
            </p>

            {/* Approve / Reject buttons — matching Figma exactly */}
            <div className="flex gap-2">
              <button
                onClick={() => setDismissed((p) => [...p, swap.id])}
                className="flex-1 py-1.5 text-[11px] font-semibold text-[#16A34A] border border-[#22C55E]/50 rounded-lg bg-white hover:bg-[#F0FDF4] transition-colors duration-150 active:scale-95"
              >
                Approve
              </button>
              <button
                onClick={() => setDismissed((p) => [...p, swap.id])}
                className="flex-1 py-1.5 text-[11px] font-semibold text-[#6B7280] border border-[#D1D5DB] rounded-lg bg-white hover:bg-[#F3F4F6] transition-colors duration-150 active:scale-95"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {active.length === 0 && (
          <p className="text-[12px] text-[#9CA3AF] text-center py-4">No pending swaps</p>
        )}
      </div>
    </div>
  );
}