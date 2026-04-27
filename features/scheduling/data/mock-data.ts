import type {
  Visit,
  UnassignedPatient,
  PendingSwap,
  CarerCapacity,
  DailyBreakdown,
  SchedulingStats,
} from "../types";

export const WEEK_DAYS = ["Mon 31", "Tue 1", "Wed 2", "Thu 3", "Fri 4", "Sat 5", "Sun 6"];

export const mockStats: SchedulingStats = {
  visitsThisWeek: 847,
  visitsToday: 110,
  visitsPending: 170,
  utilizationRate: "84%",
  utilizationChange: "+3%",
  unassignedCount: 5,
  urgentCount: 3,
  unassignedToday: 3,
  unassignedWeek: 5,
  carersAvailable: 23,
  carersTotal: 31,
  carersMoreLess: "3 to More · 1 less",
};

export const mockVisits: Visit[] = [
  // Monday
  { id: "v1", patientName: "M. Johnson", patientInitials: "MJ", carerName: "Sarah W.", startTime: "07:30", endTime: "07:50", day: 0, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v2", patientName: "B. Ahmed", patientInitials: "BA", carerName: "Priya P.", startTime: "08:00", endTime: "09:00", day: 0, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v3", patientName: "D. Morris", patientInitials: "DM", carerName: "Priya P.", startTime: "09:00", endTime: "10:00", day: 0, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v4", patientName: "H. Smith", patientInitials: "HS", carerName: "Lucy C.", startTime: "10:00", endTime: "11:00", day: 0, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v5", patientName: "E. Morris", patientInitials: "EM", carerName: "Sarah M.", startTime: "11:00", endTime: "11:30", day: 0, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },

  // Tuesday
  { id: "v6", patientName: "H. Brown", patientInitials: "HB", carerName: "James D.", startTime: "07:30", endTime: "07:50", day: 1, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },
  { id: "v7", patientName: "D. Chan", patientInitials: "DC", carerName: "James D.", startTime: "08:00", endTime: "09:30", day: 1, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },
  { id: "v8", patientName: "A. Wilson", patientInitials: "AW", carerName: "Lucy C.", startTime: "09:00", endTime: "10:30", day: 1, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v9", patientName: "R. Williams", patientInitials: "RW", carerName: "Sarah N.", startTime: "10:00", endTime: "11:00", day: 1, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v10", patientName: "D. Morris", patientInitials: "DM", carerName: "Sarah M.", startTime: "11:00", endTime: "11:30", day: 1, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },

  // Wednesday (highlighted)
  { id: "v11", patientName: "E. Morris", patientInitials: "EM", carerName: "Priya P.", startTime: "07:00", endTime: "08:00", day: 2, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v12", patientName: "B. Ahmed", patientInitials: "BA", carerName: "Sarah M.", startTime: "08:00", endTime: "09:30", day: 2, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v13", patientName: "M. Johnson", patientInitials: "MJ", carerName: "Priya P.", startTime: "09:00", endTime: "10:30", day: 2, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v14", patientName: "R. Williams", patientInitials: "RW", carerName: "Fatima K.", startTime: "10:00", endTime: "11:00", day: 2, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v15", patientName: "E. Morris", patientInitials: "EM", carerName: "Sarah M.", startTime: "11:00", endTime: "11:30", day: 2, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },

  // Thursday
  { id: "v16", patientName: "D. Turner", patientInitials: "DT", carerName: "Amara K.", startTime: "07:00", endTime: "08:00", day: 3, status: "scheduled", bgColor: "bg-[#FCE4EC]", textColor: "text-[#880E4F]" },
  { id: "v17", patientName: "B. Ahmed", patientInitials: "BA", carerName: "Priya P.", startTime: "08:00", endTime: "09:00", day: 3, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v18", patientName: "C. Morris", patientInitials: "CM", carerName: "Priya P.", startTime: "09:00", endTime: "10:30", day: 3, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v19", patientName: "M. Johnson", patientInitials: "MJ", carerName: "Thomas J.", startTime: "10:00", endTime: "11:00", day: 3, status: "scheduled", bgColor: "bg-[#F3E5F5]", textColor: "text-[#4A148C]" },
  { id: "v20", patientName: "D. Chen", patientInitials: "DC", carerName: "James O.", startTime: "11:00", endTime: "11:30", day: 3, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },

  // Friday
  { id: "v21", patientName: "H. Johnson", patientInitials: "HJ", carerName: "Sarah W.", startTime: "07:00", endTime: "08:00", day: 4, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v22", patientName: "D. Williams", patientInitials: "DW", carerName: "Fatima K.", startTime: "08:00", endTime: "09:00", day: 4, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v23", patientName: "UNASSIGNED", patientInitials: "UA", carerName: "D. Chen", startTime: "09:00", endTime: "10:30", day: 4, status: "unassigned", bgColor: "bg-[#FFEBEE]", textColor: "text-[#C62828]", isUnassigned: true },
  { id: "v24", patientName: "H. Brown", patientInitials: "HB", carerName: "Thomas J.", startTime: "10:00", endTime: "11:00", day: 4, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },
  { id: "v25", patientName: "D. Turner", patientInitials: "DT", carerName: "Amara K.", startTime: "11:00", endTime: "11:30", day: 4, status: "scheduled", bgColor: "bg-[#FCE4EC]", textColor: "text-[#880E4F]" },

  // Saturday
  { id: "v26", patientName: "A. Wilson", patientInitials: "AW", carerName: "Lucy C.", startTime: "07:00", endTime: "08:00", day: 5, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },
  { id: "v27", patientName: "D. Williams", patientInitials: "DW", carerName: "Sarah W.", startTime: "08:00", endTime: "09:00", day: 5, status: "scheduled", bgColor: "bg-[#E3F2FD]", textColor: "text-[#1565C0]" },
  { id: "v28", patientName: "F. Adams", patientInitials: "FA", carerName: "Sarah M.", startTime: "09:00", endTime: "10:30", day: 5, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },
  { id: "v29", patientName: "M. Johnson", patientInitials: "MJ", carerName: "Amara K.", startTime: "11:00", endTime: "11:30", day: 5, status: "scheduled", bgColor: "bg-[#E8F5E9]", textColor: "text-[#2E7D32]" },

  // Sunday
  { id: "v30", patientName: "H. Brown", patientInitials: "HB", carerName: "Thomas J.", startTime: "10:00", endTime: "11:00", day: 6, status: "scheduled", bgColor: "bg-[#FFF3E0]", textColor: "text-[#E65100]" },
  { id: "v31", patientName: "D. Turner", patientInitials: "DT", carerName: "Amara K.", startTime: "11:00", endTime: "11:30", day: 6, status: "scheduled", bgColor: "bg-[#FCE4EC]", textColor: "text-[#880E4F]" },
];

export const mockUnassigned: UnassignedPatient[] = [
  { id: "u1", name: "Dorothy Chen", initials: "DC", avatarColor: "#6B7280", date: "Fri 4 Apr · 08:00–10:12", time: "", issue: "Personal care · Probate client required", issueColor: "red" },
  { id: "u2", name: "Ruth Parkinson", initials: "RP", avatarColor: "#8B5CF6", date: "Fri 4 Apr · 08:00–09:30", time: "", issue: "Initial assessment · New patient", issueColor: "amber" },
  { id: "u3", name: "Joan Lewis", initials: "JL", avatarColor: "#EC4899", date: "Fri 4 Apr · 13:00–16:00", time: "", issue: "Medication · MAR sheet required", issueColor: "red" },
];

export const mockPendingSwaps: PendingSwap[] = [
  { id: "s1", fromCarer: "Sarah W.", fromInitials: "SW", fromColor: "#22C55E", toCarer: "Lucy C.", toInitials: "LC", toColor: "#3B82F6", day: "Thu 3 Apr", shift: "Morning shift" },
  { id: "s2", fromCarer: "Priya P.", fromInitials: "PP", fromColor: "#8B5CF6", toCarer: "Fatima K.", toInitials: "FK", toColor: "#EC4899", day: "Fri 4 Apr", shift: "Afternoon shift" },
];

export const mockCarerCapacity: CarerCapacity[] = [
  { id: "c1", name: "Sarah W.", initials: "SW", color: "#22C55E", scheduledHours: 36, maxHours: 37 },
  { id: "c2", name: "Priya P.", initials: "PP", color: "#8B5CF6", scheduledHours: 25, maxHours: 26 },
  { id: "c3", name: "Fatima K.", initials: "FK", color: "#EC4899", scheduledHours: 32, maxHours: 38 },
  { id: "c4", name: "Thomas J.", initials: "TJ", color: "#F59E0B", scheduledHours: 30, maxHours: 35 },
  { id: "c5", name: "Lucy C.", initials: "LC", color: "#3B82F6", scheduledHours: 26, maxHours: 28 },
  { id: "c6", name: "Amara K.", initials: "AK", color: "#14B8A6", scheduledHours: 37, maxHours: 30 },
  { id: "c7", name: "James O.", initials: "JO", color: "#6366F1", scheduledHours: 23, maxHours: 30 },
  { id: "c8", name: "David M.", initials: "DM", color: "#0EA5E9", scheduledHours: 26, maxHours: 28 },
];

export const mockDailyBreakdown: DailyBreakdown[] = [
  { day: "Mon", scheduled: 128, capacity: 140 },
  { day: "Tue", scheduled: 133, capacity: 140 },
  { day: "Wed", scheduled: 127, capacity: 140 },
  { day: "Thu", scheduled: 124, capacity: 140 },
  { day: "Fri", scheduled: 116, capacity: 140 },
  { day: "Sat", scheduled: 92, capacity: 110 },
  { day: "Sun", scheduled: 28, capacity: 50 },
];
