// components/ui/stories/careplans/CarePlanFilterTabs.stories.tsx
// Stories for the horizontal filter tab row

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CarePlanFilterTabs from "@/features/careplans/CarePlanFilterTabs";
import { FilterTab } from "@/features/careplans/data";

const meta: Meta<typeof CarePlanFilterTabs> = {
  title: "Care Plans / CarePlanFilterTabs",
  component: CarePlanFilterTabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal pill-style filter tabs: All Plans (312), Current (244), Review Due (18), Overdue (7), Pending (4), Drafts (8). Active tab gets white background + green count badge. Includes Type filter and Sort actions on the right.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarePlanFilterTabs>;

function Controlled({ initial }: { initial: FilterTab }) {
  const [active, setActive] = useState<FilterTab>(initial);
  return <CarePlanFilterTabs active={active} onChange={setActive} />;
}

/** Default — "All Plans" tab active */
export const Default: Story = {
  render: () => <Controlled initial="All Plans" />,
};

/** Overdue tab pre-selected */
export const OverdueSelected: Story = {
  render: () => <Controlled initial="Overdue" />,
};

/** Review Due tab pre-selected */
export const ReviewDueSelected: Story = {
  render: () => <Controlled initial="Review Due" />,
};
