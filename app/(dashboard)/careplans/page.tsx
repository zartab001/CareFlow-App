// app/(dashboard)/careplans/page.tsx
// Care Plans page — assembles all feature components into the full layout

"use client";

import { useState } from "react";
import CarePlanHeader from "@/features/careplans/CarePlanHeader";
import CarePlanStats from "@/features/careplans/CarePlanStats";
import CarePlanFilterTabs from "@/features/careplans/CarePlanFilterTabs";
import CarePlanGrid from "@/features/careplans/CarePlanGrid";
import ReviewQueue from "@/features/careplans/ReviewQueue";
import CarePlanCharts from "@/features/careplans/CarePlanCharts";
import { FilterTab } from "@/features/careplans/data";

/**
 * /careplans — Full Care Plans management page
 * Layout: header → stats → [filter tabs + grid | sidebar] → charts
 */
export default function CarePlansPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All Plans");

  return (
    <div className="page">
      {/* Page header: title + search + CTA */}
      <CarePlanHeader />

      {/* Top stats row */}
      <CarePlanStats />

      {/* Filter tabs row */}
      <CarePlanFilterTabs active={activeFilter} onChange={setActiveFilter} />

      {/* Main body: care plan grid + right sidebar */}
      <div className="body-row">
        <div className="body-left">
          <CarePlanGrid activeFilter={activeFilter} />
          {/* Bottom analytics charts */}
          <CarePlanCharts />
        </div>
        <ReviewQueue />
      </div>

      <style jsx>{`
        .page {
          padding: 24px;
          background: #F9FAFB;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .body-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .body-left {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1100px) {
          .body-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
