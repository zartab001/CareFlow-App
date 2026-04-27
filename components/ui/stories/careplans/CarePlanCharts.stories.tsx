// components/ui/stories/careplans/CarePlanCharts.stories.tsx
// Stories for the bottom analytics charts

import type { Meta, StoryObj } from "@storybook/react";
import CarePlanCharts from "@/features/careplans/CarePlanCharts";

const meta: Meta<typeof CarePlanCharts> = {
  title: "Care Plans / CarePlanCharts",
  component: CarePlanCharts,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two side-by-side chart cards: (1) Plan Types — horizontal bar chart with animated fill-in for Personal Care (118), Medication (94), Nutrition (42), Mobility (21), Dementia (16), Other (11). (2) Review Compliance — 5×12 heatmap grid with staggered cell reveal animation, colour-coded green/yellow/red, plus summary stats (287 reviewed, 26 avg cycle, 14 AI updated).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarePlanCharts>;

/** Default — both charts with animations */
export const Default: Story = {};

/** Narrow container to test responsive wrapping */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
};
