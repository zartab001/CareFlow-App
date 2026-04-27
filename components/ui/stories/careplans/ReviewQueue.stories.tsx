// components/ui/stories/careplans/ReviewQueue.stories.tsx
// Stories for the right-hand sidebar: Review Queue, Templates, AI Suggestions

import type { Meta, StoryObj } from "@storybook/react";
import ReviewQueue from "@/features/careplans/ReviewQueue";

const meta: Meta<typeof ReviewQueue> = {
  title: "Care Plans / ReviewQueue",
  component: ReviewQueue,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Right sidebar with three stacked panels: (1) Review Queue — patient list with Review/Approved action buttons; clicking Approved dismisses the item with animation. (2) Plan Templates — 4 templates with icons + section/patient counts, 'View all 12' CTA. (3) AI Suggestions — gradient panel with two AI-generated recommendations.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewQueue>;

/** Default — all 4 queue items visible */
export const Default: Story = {};

/** Sidebar inside a dark page background */
export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 260, background: "#F9FAFB", padding: 16, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
