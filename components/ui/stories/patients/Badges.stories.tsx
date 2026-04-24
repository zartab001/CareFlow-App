// components/ui/stories/patients/Badges.stories.tsx
// Stories for RiskBadge, StatusBadge, CarePlanBar

import type { Meta, StoryObj } from "@storybook/react";
import { RiskBadge }    from "@/features/patients/components/ui/risk-badge";
import { StatusBadge }  from "@/features/patients/components/ui/status-badge";
import { CarePlanBar }  from "@/features/patients/components/ui/care-plan-bar";

// ── RiskBadge ────────────────────────────────────────────────────────────────
export const RiskBadgeMeta: Meta<typeof RiskBadge> = {
  title: "Patients / Badges / RiskBadge",
  component: RiskBadge,
  parameters: { layout: "centered" },
};
export default RiskBadgeMeta;

export const Low:    StoryObj<typeof RiskBadge> = { args: { risk: "Low"    } };
export const Medium: StoryObj<typeof RiskBadge> = { args: { risk: "Medium" } };
export const High:   StoryObj<typeof RiskBadge> = { args: { risk: "High"   } };
export const AllRisks: StoryObj<typeof RiskBadge> = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <RiskBadge risk="Low" /> <RiskBadge risk="Medium" /> <RiskBadge risk="High" />
    </div>
  ),
};

// ── StatusBadge ──────────────────────────────────────────────────────────────
export const Active:     StoryObj<typeof StatusBadge> = { render: () => <StatusBadge status="Active"     /> };
export const OnHold:     StoryObj<typeof StatusBadge> = { render: () => <StatusBadge status="On Hold"    /> };
export const NewStatus:  StoryObj<typeof StatusBadge> = { render: () => <StatusBadge status="New"        /> };
export const Discharged: StoryObj<typeof StatusBadge> = { render: () => <StatusBadge status="Discharged" /> };

// ── CarePlanBar ──────────────────────────────────────────────────────────────
export const AllCarePlanBars: StoryObj<typeof CarePlanBar> = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-48">
      {(["Current", "Review Due", "Overdue", "In Setup", "Paused"] as const).map((s) => (
        <CarePlanBar key={s} status={s} />
      ))}
    </div>
  ),
};
