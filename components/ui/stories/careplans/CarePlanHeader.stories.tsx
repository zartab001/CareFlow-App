// components/ui/stories/careplans/CarePlanHeader.stories.tsx
// Stories for the Care Plans page header

import type { Meta, StoryObj } from "@storybook/react";
import CarePlanHeader from "@/features/careplans/CarePlanHeader";

const meta: Meta<typeof CarePlanHeader> = {
  title: "Care Plans / CarePlanHeader",
  component: CarePlanHeader,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Page header with: title 'Care Plans' + patient count subtitle on the left; search input (focuses with green border on active), Export button (outlined), and '+ New Care Plan' CTA (green, hover elevates with shadow) on the right. Animates in from top on mount.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarePlanHeader>;

/** Default — standard header with search and CTA */
export const Default: Story = {};

/** With a light page background to see shadow on CTA */
export const OnPageBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: "#F9FAFB", padding: 20, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
