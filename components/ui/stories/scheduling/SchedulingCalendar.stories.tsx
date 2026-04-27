// components/ui/stories/scheduling/SchedulingCalendar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SchedulingCalendar } from "@/features/scheduling/components/scheduling-calendar";

const meta: Meta<typeof SchedulingCalendar> = {
  title: "Scheduling / SchedulingCalendar",
  component: SchedulingCalendar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "7-day calendar grid. Today's column (Wednesday) is highlighted in green. Visit cards are colour-coded by carer. Unassigned visits appear with a dashed red border.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SchedulingCalendar>;

export const Default: Story = {};

export const TodayIsFriday: Story = {
  args: { todayIndex: 4 },
};
