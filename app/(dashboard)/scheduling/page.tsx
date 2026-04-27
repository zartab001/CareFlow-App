import { SchedulingHeader } from "@/features/scheduling/components/scheduling-header";
import { SchedulingStatsBar } from "@/features/scheduling/components/scheduling-stats-bar";
import { SchedulingCalendar } from "@/features/scheduling/components/scheduling-calendar";
import { UnassignedPanel } from "@/features/scheduling/components/unassigned-panel";
import { AiSchedulerPanel } from "@/features/scheduling/components/ai-scheduler-panel";
import { PendingSwapsPanel } from "@/features/scheduling/components/pending-swaps-panel";
import { CarerCapacityChart } from "@/features/scheduling/components/carer-capacity-chart";
import { DailyBreakdownChart } from "@/features/scheduling/components/daily-breakdown-chart";

export default function SchedulingPage() {
  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] overflow-hidden">
      {/* Top bar */}
      <SchedulingHeader />

      {/* Stats bar */}
      <SchedulingStatsBar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar (grows) */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <SchedulingCalendar />
        </div>

        {/* Right sidebar */}
        <div className="w-[240px] shrink-0 border-l border-[#E4E5EA] bg-white overflow-y-auto">
          <div className="p-4 space-y-5">
            <UnassignedPanel />
            <div className="border-t border-[#E4E5EA] pt-4">
              <AiSchedulerPanel />
            </div>
            <div className="border-t border-[#E4E5EA] pt-4">
              <PendingSwapsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-2 gap-4 p-4 border-t border-[#E4E5EA] bg-[#F9FAFB] shrink-0">
        <CarerCapacityChart />
        <DailyBreakdownChart />
      </div>
    </div>
  );
}
