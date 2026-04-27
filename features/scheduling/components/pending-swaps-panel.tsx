"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { mockPendingSwaps } from "../data/mock-data";
import type { PendingSwap } from "../types";

interface PendingSwapsPanelProps {
  swaps?: PendingSwap[];
}

function SwapAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="inline-flex w-5 h-5 rounded-full items-center justify-center text-[9px] font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

export function PendingSwapsPanel({ swaps = mockPendingSwaps }: PendingSwapsPanelProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const active = swaps.filter((s) => !dismissed.includes(s.id));

  const handleApprove = (id: string) => setDismissed((prev) => [...prev, id]);
  const handleReject = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <div className="animate-fade-in">
      <p className="text-[12px] font-semibold text-[#111827] mb-3">Pending Swaps</p>
      <div className="space-y-3">
        {active.map((swap, i) => (
          <div
            key={swap.id}
            className="border border-[#E4E5EA] rounded-lg p-2.5 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Carer names */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <SwapAvatar initials={swap.fromInitials} color={swap.fromColor} />
              <span className="text-[10px] font-semibold text-[#374151]">{swap.fromCarer}</span>
              <ArrowLeftRight size={10} className="text-[#9CA3AF] mx-0.5" />
              <SwapAvatar initials={swap.toInitials} color={swap.toColor} />
              <span className="text-[10px] font-semibold text-[#374151]">{swap.toCarer}</span>
            </div>
            <p className="text-[9px] text-[#9CA3AF] mb-2">{swap.day} · {swap.shift}</p>

            {/* Actions */}
            <div className="flex gap-1.5">
              <button
                onClick={() => handleApprove(swap.id)}
                className="flex-1 py-1 text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] border border-[#22C55E]/30 rounded-md hover:bg-[#DCFCE7] transition-colors duration-150 active:scale-95"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(swap.id)}
                className="flex-1 py-1 text-[10px] font-semibold text-[#6B7280] bg-[#F9FAFB] border border-[#E4E5EA] rounded-md hover:bg-[#F3F4F6] transition-colors duration-150 active:scale-95"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {active.length === 0 && (
          <p className="text-[11px] text-[#9CA3AF] text-center py-4">
            No pending swaps
          </p>
        )}
      </div>
    </div>
  );
}
