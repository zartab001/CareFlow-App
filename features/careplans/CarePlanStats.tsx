"use client";

import { useEffect, useState } from "react";

interface StatCard {
  label: string;
  value: number;
  badge: string;
  badgeColor: "green" | "amber" | "red" | "purple";
  valueColor: string;
  sub1: string;
  sub2: string;
}

const STATS: StatCard[] = [
  {
    label: "TOTAL PLANS",
    value: 312,
    badge: "across 142 patients",
    badgeColor: "green",
    valueColor: "text-[#111827]",
    sub1: "78% current",
    sub2: "2.2 avg per patient",
  },
  {
    label: "DUE FOR REVIEW",
    value: 18,
    badge: "within 7 days",
    badgeColor: "amber",
    valueColor: "text-[#D97706]",
    sub1: "12 this week",
    sub2: "6 next week",
  },
  {
    label: "OVERDUE",
    value: 7,
    badge: "action needed",
    badgeColor: "red",
    valueColor: "text-[#DC2626]",
    sub1: "3 critical",
    sub2: "4 standard",
  },
  {
    label: "PENDING APPROVAL",
    value: 4,
    badge: "awaiting sign-off",
    badgeColor: "purple",
    valueColor: "text-[#7C3AED]",
    sub1: "2 new plans",
    sub2: "2 updated",
  },
];

const BADGE_STYLES: Record<StatCard["badgeColor"], string> = {
  green:  "text-[#16A34A]",
  amber:  "text-[#D97706]",
  red:    "text-[#DC2626]",
  purple: "text-[#7C3AED]",
};

function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function StatCard({ card, delay }: { card: StatCard; delay: number }) {
  const count = useCountUp(card.value, 900);

  return (
    <div
      className="flex-1 bg-white border border-[#E4E5EA] rounded-xl p-5 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">
        {card.label}
      </p>

      {/* Number + badge inline */}
      <div className="flex items-baseline gap-3 mb-2">
        <span className={`text-[40px] font-bold leading-none ${card.valueColor}`}>
          {count}
        </span>
        <span className={`text-[12px] font-semibold ${BADGE_STYLES[card.badgeColor]}`}>
          {card.badge}
        </span>
      </div>

      {/* Two sub-lines */}
      <p className="text-[12px] text-[#6B7280]">
        {card.sub1}
        <span className="mx-1.5 text-[#D1D5DB]">·</span>
        {card.sub2}
      </p>
    </div>
  );
}

export default function CarePlanStats() {
  return (
    <div className="flex gap-4 px-6 py-4 bg-white border-b border-[#E4E5EA]">
      {STATS.map((card, i) => (
        <StatCard key={card.label} card={card} delay={i * 60} />
      ))}
    </div>
  );
}
