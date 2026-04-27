// components/ui/stories/careplans/CarePlanCard.stories.tsx
// Stories for a single care plan card

import type { Meta, StoryObj } from "@storybook/react";
import CarePlanCard from "@/features/careplans/CarePlanCard";
import { CarePlan } from "@/features/careplans/data";

const meta: Meta<typeof CarePlanCard> = {
  title: "Care Plans / CarePlanCard",
  component: CarePlanCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Individual care plan card with: type badge (colour-coded), status pill (Current/Review Due/Overdue/Pending), patient name + age + last reviewer, footer with next review date or awaiting sign-off label, and hover elevation + green arrow animation.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CarePlanCard>;

const base: CarePlan = {
  id: "s1",
  patientName: "Margaret Johnson",
  patientAge: 74,
  lastReviewedDate: "6 Mar",
  lastReviewedBy: "Sarah W.",
  nextReview: "> 1yr",
  status: "Current",
  type: "Personal Care",
  goals: 4,
};

/** Current — green status */
export const Current: Story = {
  args: { plan: base, index: 0 },
};

/** Review Due — amber status */
export const ReviewDue: Story = {
  args: {
    plan: { ...base, id: "s2", patientName: "Robert Ahmed", status: "Review Due", type: "Medication", nextReview: "4 additional care" },
    index: 0,
  },
};

/** Overdue — red status */
export const Overdue: Story = {
  args: {
    plan: { ...base, id: "s3", patientName: "Dorothy Chen", patientAge: 103, status: "Overdue", type: "Nutrition", nextReview: "Overdue by 15 days" },
    index: 0,
  },
};

/** Pending — purple, awaiting sign off */
export const PendingSignOff: Story = {
  args: {
    plan: { ...base, id: "s4", patientName: "Henry Smith", patientAge: 81, status: "Pending", type: "Mobility", awaitingSignOff: true },
    index: 0,
  },
};
