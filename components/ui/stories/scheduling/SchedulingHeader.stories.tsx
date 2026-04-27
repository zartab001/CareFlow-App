// components/ui/stories/scheduling/SchedulingHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SchedulingHeader } from "@/features/scheduling/components/scheduling-header";

const meta: Meta<typeof SchedulingHeader> = {
  title: "Scheduling / SchedulingHeader",
  component: SchedulingHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top navigation bar for the scheduling page. Contains week navigation, Filter button, AI Optimise button, and New Visit CTA.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SchedulingHeader>;

export const Default: Story = {};

export const CustomWeekLabel: Story = {
  args: { weekLabel: "Next Week" },
};
