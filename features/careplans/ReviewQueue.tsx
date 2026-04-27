// features/careplans/ReviewQueue.tsx
// Right sidebar panel: Review Queue, Plan Templates, AI Suggestions

"use client";

import { useState } from "react";
import { REVIEW_QUEUE, PLAN_TEMPLATES } from "./data";

const AVATAR_COLORS: Record<string, string> = {
  DC: "#10B981", RA: "#3B82F6", FA: "#F59E0B", HS: "#8B5CF6",
};

/** Review queue + templates + AI suggestions sidebar */
export default function ReviewQueue() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = REVIEW_QUEUE.filter((r) => !dismissed.includes(r.id));

  return (
    <aside className="sidebar">
      {/* Review Queue */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">Review Queue</span>
          <span className="queue-badge">{visible.length}</span>
        </div>

        <div className="queue-list">
          {visible.map((item, i) => (
            <div
              key={item.id}
              className="queue-item"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="avatar"
                style={{ background: `${AVATAR_COLORS[item.initials]}20`, color: AVATAR_COLORS[item.initials] }}
              >
                {item.initials}
              </div>
              <div className="queue-info">
                <p className="queue-name">{item.patientName}</p>
                <p className="queue-sub">{item.planType}</p>
              </div>
              <button
                className={`queue-action ${item.status === "Approved" ? "approved" : ""}`}
                onClick={() => item.status === "Approved" && setDismissed((d) => [...d, item.id])}
              >
                {item.status}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Templates */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">Plan Templates</span>
          <button className="manage-btn">Manage</button>
        </div>

        <div className="templates-list">
          {PLAN_TEMPLATES.map((t, i) => (
            <div key={t.id} className="template-item" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="template-icon" style={{ background: `${t.color}15`, color: t.color }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div className="template-info">
                <p className="template-name">{t.name}</p>
                <p className="template-meta">{t.sections} sections · {t.patients} patients</p>
              </div>
              <svg className="template-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}

          <button className="view-all-btn">View all 12 templates</button>
        </div>
      </section>

      {/* AI Suggestions */}
      <section className="panel ai-panel">
        <div className="panel-header">
          <span className="ai-icon">✦</span>
          <span className="panel-title">AI Suggestions</span>
        </div>
        <div className="ai-suggestions">
          <div className="ai-item">
            <span className="ai-letter">A.</span>
            <p className="ai-text">
              <strong>Ahmed</strong>: fluid intake declined 40% over 7 days. Consider updating nutrition plan and reviewing GP.
            </p>
          </div>
          <div className="ai-item">
            <span className="ai-letter">B.</span>
            <p className="ai-text">
              <strong>Oliver</strong>: 3 falls in 6 weeks. Recommend OT referral and falls prevention plan update.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .sidebar {
          width: 260px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .panel {
          background: #fff;
          border: 1px solid #E4E5EA;
          border-radius: 12px;
          padding: 14px;
          animation: fadeUp 0.35s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .panel-title {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }
        .queue-badge {
          background: #FEF3C7;
          color: #D97706;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
        }
        .manage-btn {
          font-size: 11px;
          color: #10B981;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .queue-list { display: flex; flex-direction: column; gap: 8px; }
        .queue-item {
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideIn 0.3s ease both;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .queue-info { flex: 1; min-width: 0; }
        .queue-name {
          font-size: 11px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .queue-sub {
          font-size: 10px;
          color: #9CA3AF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .queue-action {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 5px;
          border: 1px solid #E4E5EA;
          background: #fff;
          color: #374151;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .queue-action:hover { border-color: #10B981; color: #10B981; }
        .queue-action.approved {
          background: #F0FDF4;
          color: #10B981;
          border-color: #10B981;
        }
        .templates-list { display: flex; flex-direction: column; gap: 6px; }
        .template-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.15s ease;
          animation: slideIn 0.3s ease both;
        }
        .template-item:hover { background: #F9FAFB; }
        .template-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .template-info { flex: 1; min-width: 0; }
        .template-name {
          font-size: 11px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        .template-meta {
          font-size: 10px;
          color: #9CA3AF;
          margin: 0;
        }
        .template-arrow { flex-shrink: 0; }
        .view-all-btn {
          width: 100%;
          padding: 8px;
          background: none;
          border: 1px dashed #E4E5EA;
          border-radius: 7px;
          font-size: 11px;
          color: #10B981;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          transition: all 0.15s ease;
        }
        .view-all-btn:hover { background: #F0FDF4; border-color: #10B981; }
        .ai-panel { background: linear-gradient(135deg, #F0FDF4 0%, #fff 100%); }
        .ai-icon { font-size: 14px; color: #10B981; }
        .ai-suggestions { display: flex; flex-direction: column; gap: 10px; }
        .ai-item { display: flex; gap: 6px; }
        .ai-letter {
          font-size: 11px;
          font-weight: 700;
          color: #10B981;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ai-text {
          font-size: 11px;
          color: #374151;
          margin: 0;
          line-height: 1.5;
        }
        .ai-text strong { color: #111827; }
      `}</style>
    </aside>
  );
}
