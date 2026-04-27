// components/ui/stories/scheduling/SchedulingStatsBar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SchedulingStatsBar } from "@/features/scheduling/components/scheduling-stats-bar";
import { mockStats } from "@/features/scheduling/data/mock-data";

const meta: Meta<typeof SchedulingStatsBar> = {
  title: "Scheduling / SchedulingStatsBar",
  component: SchedulingStatsBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Four KPI stat cards: Visits This Week, Unassigned (with urgent badge), Carers Available, and Utilisation Rate.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SchedulingStatsBar>;

export const Default: Story = {};

export const HighUnassigned: Story = {
  args: {
    stats: { ...mockStats, unassignedCount: 12, urgentCount: 7 },
  },
};

export const LowUtilisation: Story = {
  args: {
    stats: { ...mockStats, utilizationRate: "61%", utilizationChange: "-4%" },
  },
};
