"use client";

import { ChevronDown } from "lucide-react";
import { mockUnassigned } from "../data/mock-data";
import type { UnassignedPatient } from "../types";

interface UnassignedPanelProps {
  patients?: UnassignedPatient[];
  count?: number;
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

export function UnassignedPanel({
  patients = mockUnassigned,
  count = 5,
}: UnassignedPanelProps) {
  return (
    <div className="animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-[13px] font-bold text-[#111827]">Unassigned</span>
        <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {patients.map((patient, i) => (
          <div
            key={patient.id}
            className="border border-[#E4E5EA] rounded-xl p-3 hover:border-[#D1D5DB] hover:shadow-sm transition-all duration-200 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-2.5">
              <Avatar initials={patient.initials} color={patient.avatarColor} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#111827]">{patient.name}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{patient.date}</p>
                <p
                  className={`text-[11px] mt-1 font-semibold leading-snug ${
                    patient.issueColor === "red" ? "text-[#EF4444]" : "text-[#F59E0B]"
                  }`}
                >
                  {patient.issue}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > patients.length && (
        <button className="w-full mt-3 text-[12px] font-medium text-[#6B7280] hover:text-[#374151] flex items-center justify-center gap-1 py-1.5 transition-colors duration-150">
          View {count - patients.length} more
          <ChevronDown size={13} />
        </button>
      )}
    </div>
  );
}