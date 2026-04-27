// components/ui/stories/scheduling/CarerCapacityChart.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { CarerCapacityChart } from "@/features/scheduling/components/carer-capacity-chart";

const capacityMeta: Meta<typeof CarerCapacityChart> = {
  title: "Scheduling / CarerCapacityChart",
  component: CarerCapacityChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal bar chart showing each carer's scheduled vs. max hours. Bars turn amber when a carer is over capacity. Carers are sorted by utilisation.",
      },
    },
  },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};
export default capacityMeta;
type CapacityStory = StoryObj<typeof CarerCapacityChart>;
export const Default: CapacityStory = {};


// components/ui/stories/scheduling/DailyBreakdownChart.stories.tsx
import type { StoryObj as SO } from "@storybook/react";
import { DailyBreakdownChart } from "@/features/scheduling/components/daily-breakdown-chart";

export const DailyBreakdown: SO<typeof DailyBreakdownChart> = {
  render: () => (
    <div className="w-[480px]">
      <DailyBreakdownChart />
    </div>
  ),
  name: "DailyBreakdownChart",
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side grouped bars for scheduled vs capacity per day. Today (Wed) has a darker green bar. Summary stats (Avg/Day, Peak Day, Contacts) appear below the chart.",
      },
    },
  },
};
