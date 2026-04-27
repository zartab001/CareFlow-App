// features/careplans/CarePlanHeader.tsx
// Page header: title, patient count, search bar, export, new care plan CTA

"use client";

import { useState } from "react";

interface Props {
  onSearch?: (q: string) => void;
}

/** Top header bar for the Care Plans page */
export default function CarePlanHeader({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="page-title">Care Plans</h1>
        <p className="page-sub">312 plans across 142 patients</p>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="search-wrap">
          <svg className="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search plans or patients..."
            value={query}
            onChange={handleChange}
          />
        </div>

        {/* Export */}
        <button className="btn-export">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>

        {/* New Care Plan CTA */}
        <button className="btn-new">
          <span className="btn-plus">+</span>
          New Care Plan
        </button>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          animation: fadeDown 0.3s ease both;
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .page-sub {
          font-size: 11px;
          color: #9CA3AF;
          margin: 2px 0 0;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 9px;
          pointer-events: none;
        }
        .search-input {
          padding: 7px 12px 7px 28px;
          border: 1px solid #E4E5EA;
          border-radius: 8px;
          font-size: 12px;
          color: #374151;
          background: #fff;
          outline: none;
          width: 190px;
          transition: border-color 0.15s ease;
        }
        .search-input::placeholder { color: #9CA3AF; }
        .search-input:focus { border-color: #10B981; }
        .btn-export {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border: 1px solid #E4E5EA;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          background: #fff;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-export:hover { border-color: #9CA3AF; }
        .btn-new {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: #10B981;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px #10B98140;
        }
        .btn-new:hover {
          background: #059669;
          box-shadow: 0 4px 14px #10B98160;
          transform: translateY(-1px);
        }
        .btn-plus {
          font-size: 16px;
          font-weight: 400;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}
