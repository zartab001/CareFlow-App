export type RiskLevel = "low" | "medium" | "high";
export type VisitStatus = "scheduled" | "unassigned" | "completed" | "missed";

export interface Carer {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  color: string;
  address?: string;
  risk?: RiskLevel;
  pendingIssue?: string;
}

export interface Visit {
  id: string;
  patientName: string;
  patientInitials: string;
  carerName: string;
  carerInitials?: string;
  startTime: string;
  endTime: string;
  day: number; // 0=Mon, 6=Sun
  status: VisitStatus;
  bgColor?: string;
  textColor?: string;
  isUnassigned?: boolean;
}

export interface UnassignedPatient {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  date: string;
  time: string;
  issue: string;
  issueColor: "red" | "amber";
}

export interface PendingSwap {
  id: string;
  fromCarer: string;
  fromInitials: string;
  fromColor: string;
  toCarer: string;
  toInitials: string;
  toColor: string;
  day: string;
  shift: string;
}

export interface CarerCapacity {
  id: string;
  name: string;
  initials: string;
  color: string;
  scheduledHours: number;
  maxHours: number;
}

export interface DailyBreakdown {
  day: string;
  scheduled: number;
  capacity: number;
}

export interface SchedulingStats {
  visitsThisWeek: number;
  visitsToday: number;
  visitsPending: number;
  utilizationRate: string;
  utilizationChange: string;
  unassignedCount: number;
  urgentCount: number;
  unassignedToday: number;
  unassignedWeek: number;
  carersAvailable: number;
  carersTotal: number;
  carersMoreLess: string;
}
