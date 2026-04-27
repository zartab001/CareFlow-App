// components/ui/stories/scheduling/AiSchedulerPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { AiSchedulerPanel } from "@/features/scheduling/components/ai-scheduler-panel";

const meta: Meta<typeof AiSchedulerPanel> = {
  title: "Scheduling / AiSchedulerPanel",
  component: AiSchedulerPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "AI Smart Scheduler card. Clicking 'Optimise Week' triggers a 1.8s loading state then shows a success state. Considers carer skills, patient preferences, travel distance and Working Time Directive limits.",
      },
    },
  },
  decorators: [(Story) => <div className="w-[220px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof AiSchedulerPanel>;

export const Default: Story = {};
