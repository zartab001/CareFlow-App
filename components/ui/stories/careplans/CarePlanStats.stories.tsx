// components/ui/stories/careplans/CarePlanStats.stories.tsx
// Stories for the top statistics bar on the Care Plans page

import type { Meta, StoryObj } from "@storybook/react";
import CarePlanStats from "@/features/careplans/CarePlanStats";

const meta: Meta<typeof CarePlanStats> = {
  title: "Care Plans / CarePlanStats",
  component: CarePlanStats,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Top stats bar with 4 animated counters: Total Plans (312), Due for Review (18, amber), Overdue (7, red), Pending Approval (4, purple). Each counter animates from 0 on mount with a staggered delay.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarePlanStats>;

/** Default — all 4 stats visible with animated counters */
export const Default: Story = {};

/** Rendered inside a constrained card to simulate sidebar usage */
export const Contained: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-gray-50 p-4 rounded-xl">
        <Story />
      </div>
    ),
  ],
};
