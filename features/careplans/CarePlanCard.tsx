// features/careplans/CarePlanCard.tsx
// Single care plan card with type badge, status, patient info, and review date

"use client";

import { useState } from "react";
import { CarePlan, PlanStatus, PlanType } from "./data";

const TYPE_COLORS: Record<PlanType, { bg: string; text: string; dot: string }> = {
  "Personal Care":    { bg: "#EFF6FF", text: "#3B82F6", dot: "#3B82F6" },
  "Medication":       { bg: "#F0FDF4", text: "#10B981", dot: "#10B981" },
  "Dementia Support": { bg: "#FFF7ED", text: "#F97316", dot: "#F97316" },
  "Nutrition":        { bg: "#FEFCE8", text: "#EAB308", dot: "#EAB308" },
  "Mobility":         { bg: "#F5F3FF", text: "#8B5CF6", dot: "#8B5CF6" },
  "Mental Wellbeing": { bg: "#FDF2F8", text: "#EC4899", dot: "#EC4899" },
};

const STATUS_STYLES: Record<PlanStatus, { color: string; bg: string; label: string }> = {
  "Current":    { color: "#10B981", bg: "#F0FDF4", label: "● Current" },
  "Review Due": { color: "#F59E0B", bg: "#FFFBEB", label: "● Review Due" },
  "Overdue":    { color: "#EF4444", bg: "#FEF2F2", label: "● Overdue" },
  "Pending":    { color: "#8B5CF6", bg: "#F5F3FF", label: "● Pending" },
  "Draft":      { color: "#9CA3AF", bg: "#F9FAFB", label: "● Draft" },
};

interface Props {
  plan: CarePlan;
  index: number;
}

/** Animated care plan card */
export default function CarePlanCard({ plan, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const typeStyle = TYPE_COLORS[plan.type];
  const statusStyle = STATUS_STYLES[plan.status];

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 60}ms`,
        boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {/* Type badge + Status */}
      <div className="card-header">
        <span className="type-badge" style={{ background: typeStyle.bg, color: typeStyle.text }}>
          <span style={{ background: typeStyle.dot, borderRadius: "50%", width: 5, height: 5, display: "inline-block", marginRight: 4 }} />
          {plan.type.toUpperCase()}
        </span>
        <span className="status-badge" style={{ color: statusStyle.color, background: statusStyle.bg }}>
          {statusStyle.label}
        </span>
      </div>

      {/* Patient info */}
      <div className="card-body">
        <p className="patient-name">{plan.patientName}</p>
        <p className="patient-meta">
          {plan.patientAge} · Last reviewed {plan.lastReviewedDate}
          {plan.lastReviewedBy ? ` · ${plan.lastReviewedBy}` : ""}
        </p>
      </div>

      {/* Footer */}
      <div className="card-footer">
        {plan.awaitingSignOff ? (
          <span className="awaiting">Awaiting sign off</span>
        ) : (
          <span className="next-review">
            Next review: {plan.nextReview}
          </span>
        )}
        <span className="goals">
          {plan.medications ? `${plan.medications} medications` : `${plan.goals} goals`}
        </span>
      </div>

      {/* Hover arrow */}
      <div className="card-arrow" style={{ opacity: hovered ? 1 : 0 }}>›</div>

      <style jsx>{`
        .card {
          position: relative;
          background: #fff;
          border: 1px solid #E4E5EA;
          border-radius: 10px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          animation: slideIn 0.3s ease both;
          overflow: hidden;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .type-badge {
          display: flex;
          align-items: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 3px 7px;
          border-radius: 4px;
        }
        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .card-body { margin-bottom: 10px; }
        .patient-name {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 2px;
        }
        .patient-meta {
          font-size: 11px;
          color: #9CA3AF;
          margin: 0;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #F3F4F6;
          padding-top: 8px;
        }
        .next-review {
          font-size: 11px;
          color: #6B7280;
        }
        .awaiting {
          font-size: 11px;
          color: #8B5CF6;
          font-weight: 500;
        }
        .goals {
          font-size: 11px;
          color: #9CA3AF;
          font-weight: 500;
        }
        .card-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: #10B981;
          transition: opacity 0.15s ease;
        }
      `}</style>
    </div>
  );
}
