// features/careplans/CarePlanGrid.tsx
// 2-column grid of care plan cards, filtered by active tab

"use client";

import { CARE_PLANS, FilterTab } from "./data";
import CarePlanCard from "./CarePlanCard";

interface Props {
  activeFilter: FilterTab;
}

const STATUS_MAP: Record<FilterTab, string | null> = {
  "All Plans": null,
  "Current": "Current",
  "Review Due": "Review Due",
  "Overdue": "Overdue",
  "Pending": "Pending",
  "Drafts": "Draft",
};

/** 2-column care plan card grid */
export default function CarePlanGrid({ activeFilter }: Props) {
  const filterStatus = STATUS_MAP[activeFilter];
  const plans = filterStatus
    ? CARE_PLANS.filter((p) => p.status === filterStatus)
    : CARE_PLANS;

  return (
    <div className="grid-wrap">
      {plans.length === 0 ? (
        <div className="empty">No care plans match this filter.</div>
      ) : (
        <div className="grid">
          {plans.map((plan, i) => (
            <CarePlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      )}

      <style jsx>{`
        .grid-wrap {
          flex: 1;
          min-width: 0;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .empty {
          text-align: center;
          color: #9CA3AF;
          font-size: 13px;
          padding: 40px 0;
        }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
