// components/ui/stories/scheduling/PendingSwapsPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { PendingSwapsPanel } from "@/features/scheduling/components/pending-swaps-panel";

const meta: Meta<typeof PendingSwapsPanel> = {
  title: "Scheduling / PendingSwapsPanel",
  component: PendingSwapsPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pending shift-swap requests. Each card shows both carers' avatars with an arrow between them, the day/shift, and Approve/Reject buttons. Approved or rejected cards disappear with a transition.",
      },
    },
  },
  decorators: [(Story) => <div className="w-[220px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof PendingSwapsPanel>;

export const Default: Story = {};

export const NoSwaps: Story = {
  args: { swaps: [] },
};
