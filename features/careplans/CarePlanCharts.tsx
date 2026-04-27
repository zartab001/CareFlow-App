// features/careplans/CarePlanCharts.tsx
// Bottom charts: Plan Types horizontal bar chart + Review Compliance heatmap

"use client";

import { useEffect, useState } from "react";
import { PLAN_TYPE_COUNTS } from "./data";

const MAX_COUNT = 118;

/** Animated horizontal bar chart for plan types */
function PlanTypesChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <span className="chart-title">Plan Types</span>
        <span className="chart-total">312 total</span>
      </div>

      <div className="bars">
        {PLAN_TYPE_COUNTS.map((item, i) => (
          <div key={item.type} className="bar-row" style={{ animationDelay: `${i * 60}ms` }}>
            <span className="bar-label">{item.type}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: animated ? `${(item.count / MAX_COUNT) * 100}%` : "0%",
                  background: item.color,
                  transitionDelay: `${i * 60 + 200}ms`,
                }}
              />
            </div>
            <span className="bar-count">{item.count}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .chart-card {
          background: #fff;
          border: 1px solid #E4E5EA;
          border-radius: 12px;
          padding: 16px;
          flex: 1;
          min-width: 0;
        }
        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .chart-title {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }
        .chart-total {
          font-size: 11px;
          color: #9CA3AF;
        }
        .bars { display: flex; flex-direction: column; gap: 8px; }
        .bar-row {
          display: flex;
          align-items: center;
          gap: 8px;
          animation: fadeIn 0.3s ease both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .bar-label {
          font-size: 11px;
          color: #374151;
          width: 90px;
          flex-shrink: 0;
        }
        .bar-track {
          flex: 1;
          height: 6px;
          background: #F3F4F6;
          border-radius: 3px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bar-count {
          font-size: 11px;
          color: #6B7280;
          width: 24px;
          text-align: right;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

// Heatmap data: 5 rows × 12 cols, value 0–1
const HEATMAP_DATA = [
  [0.9,0.8,0.95,0.7,0.85,0.9,0.6,0.75,0.85,0.9,0.8,0.7],
  [0.7,0.85,0.8,0.9,0.95,0.8,0.7,0.85,0.9,0.6,0.75,0.8],
  [0.8,0.9,0.7,0.85,0.75,0.9,0.85,0.6,0.5,0.8,0.9,0.85],
  [0.9,0.7,0.85,0.9,0.8,0.95,0.7,0.75,0.85,0.9,0.3,0.7],
  [0.6,0.8,0.9,0.75,0.85,0.7,0.9,0.8,0.9,0.7,0.85,0.9],
];

function getHeatColor(v: number) {
  if (v >= 0.85) return "#10B981";
  if (v >= 0.7) return "#34D399";
  if (v >= 0.5) return "#6EE7B7";
  if (v >= 0.35) return "#FCD34D";
  return "#FCA5A5";
}

/** Review compliance heatmap calendar */
function ReviewComplianceHeatmap() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="heatmap-card">
      <div className="heatmap-header">
        <span className="chart-title">Review Compliance</span>
        <span className="compliance-pct">~ 90%</span>
      </div>

      <div className="heatmap-grid">
        {HEATMAP_DATA.map((row, ri) =>
          row.map((val, ci) => (
            <div
              key={`${ri}-${ci}`}
              className="heatmap-cell"
              title={`${Math.round(val * 100)}%`}
              style={{
                background: getHeatColor(val),
                opacity: animated ? 1 : 0,
                transform: animated ? "scale(1)" : "scale(0.5)",
                transitionDelay: `${(ri * 12 + ci) * 12}ms`,
              }}
            />
          ))
        )}
      </div>

      <div className="legend">
        <span className="legend-item"><span className="dot" style={{ background: "#10B981" }} /> On time</span>
        <span className="legend-item"><span className="dot" style={{ background: "#FCD34D" }} /> Late</span>
        <span className="legend-item"><span className="dot" style={{ background: "#FCA5A5" }} /> Missed</span>
        <span className="legend-item"><span className="dot" style={{ background: "#E5E7EB" }} /> None</span>
      </div>

      <div className="heatmap-footer">
        <div className="footer-stat">
          <span className="footer-num">287</span>
          <span className="footer-label">Reviewed<br/>this cycle</span>
        </div>
        <div className="footer-stat">
          <span className="footer-num" style={{ color: "#F59E0B" }}>26</span>
          <span className="footer-label">Avg cycle<br/><span style={{ color: "#EF4444" }}>↑7</span></span>
        </div>
        <div className="footer-stat">
          <span className="footer-num" style={{ color: "#EF4444" }}>14</span>
          <span className="footer-label">AI updated<br/>last week</span>
        </div>
      </div>

      <style jsx>{`
        .heatmap-card {
          background: #fff;
          border: 1px solid #E4E5EA;
          border-radius: 12px;
          padding: 16px;
          flex: 1.4;
          min-width: 0;
        }
        .heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .chart-title { font-size: 12px; font-weight: 700; color: #111827; }
        .compliance-pct { font-size: 11px; font-weight: 700; color: #10B981; }
        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 4px;
          margin-bottom: 10px;
        }
        .heatmap-cell {
          aspect-ratio: 1;
          border-radius: 4px;
          transition: opacity 0.25s ease, transform 0.25s ease, background 0.2s;
          cursor: pointer;
        }
        .heatmap-cell:hover { filter: brightness(1.1); }
        .legend {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: #6B7280;
        }
        .dot { width: 7px; height: 7px; border-radius: 2px; display: inline-block; }
        .heatmap-footer {
          display: flex;
          gap: 16px;
          border-top: 1px solid #F3F4F6;
          padding-top: 10px;
        }
        .footer-stat { display: flex; align-items: center; gap: 6px; }
        .footer-num { font-size: 18px; font-weight: 700; color: #111827; }
        .footer-label { font-size: 9px; color: #9CA3AF; line-height: 1.3; }
      `}</style>
    </div>
  );
}

/** Both bottom charts side by side */
export default function CarePlanCharts() {
  return (
    <div className="charts-row">
      <PlanTypesChart />
      <ReviewComplianceHeatmap />
      <style jsx>{`
        .charts-row {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
