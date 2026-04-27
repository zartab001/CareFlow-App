// components/ui/stories/scheduling/UnassignedPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UnassignedPanel } from "@/features/scheduling/components/unassigned-panel";

const meta: Meta<typeof UnassignedPanel> = {
  title: "Scheduling / UnassignedPanel",
  component: UnassignedPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Right-panel list of unassigned patients. Shows avatar, name, date/time, and issue type (red = urgent, amber = warning). 'View more' link appears when count exceeds visible cards.",
      },
    },
  },
  decorators: [(Story) => <div className="w-[240px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof UnassignedPanel>;

export const Default: Story = {};

export const Empty: Story = {
  args: { patients: [], count: 0 },
};

export const ManyUnassigned: Story = {
  args: { count: 9 },
};
