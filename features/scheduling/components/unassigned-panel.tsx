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
      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#111827]">Unassigned</span>
          <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center">
            {count}
          </span>
        </div>
      </div>

      {/* Patient cards */}
      <div className="space-y-2">
        {patients.map((patient, i) => (
          <div
            key={patient.id}
            className="border border-[#E4E5EA] rounded-lg p-3 hover:border-[#D1D5DB] hover:shadow-sm transition-all duration-200 cursor-pointer animate-fade-in group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-2">
              <Avatar initials={patient.initials} color={patient.avatarColor} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#111827] truncate">
                  {patient.name}
                </p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{patient.date}</p>
                <p
                  className={`text-[10px] mt-1 font-medium ${
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

      {/* View more */}
      {count > patients.length && (
        <button className="w-full mt-2 text-[11px] text-[#6B7280] hover:text-[#374151] flex items-center justify-center gap-1 py-1.5 transition-colors duration-150">
          View {count - patients.length} more
          <ChevronDown size={11} />
        </button>
      )}
    </div>
  );
}
