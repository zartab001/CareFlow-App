// features/careplans/CarePlanFilterTabs.tsx
// Filter tabs: All Plans, Current, Review Due, Overdue, Pending, Drafts

"use client";

import { FILTER_TABS, FilterTab, STATS } from "./data";

const TAB_COUNTS: Record<FilterTab, number> = {
  "All Plans": 312,
  "Current": 244,
  "Review Due": 18,
  "Overdue": 7,
  "Pending": 4,
  "Drafts": 8,
};

interface Props {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

/** Horizontal filter tab row with counts */
export default function CarePlanFilterTabs({ active, onChange }: Props) {
  return (
    <div className="filter-wrap">
      <div className="tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`tab ${active === tab ? "tab--active" : ""}`}
          >
            {tab}
            <span className={`tab-count ${active === tab ? "tab-count--active" : ""}`}>
              {TAB_COUNTS[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="actions">
        <button className="btn-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Type
        </button>
        <button className="btn-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          Sort by: Review Date
        </button>
      </div>

      <style jsx>{`
        .filter-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .tabs {
          display: flex;
          gap: 2px;
          background: #F3F4F6;
          border-radius: 8px;
          padding: 3px;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .tab:hover { color: #111827; }
        .tab--active {
          background: #fff;
          color: #111827;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .tab-count {
          font-size: 10px;
          padding: 1px 5px;
          border-radius: 10px;
          background: #E5E7EB;
          color: #6B7280;
          font-weight: 600;
        }
        .tab-count--active {
          background: #10B98120;
          color: #10B981;
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        .btn-icon {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border: 1px solid #E4E5EA;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          background: #fff;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-icon:hover {
          border-color: #10B981;
          color: #10B981;
        }
      `}</style>
    </div>
  );
}
