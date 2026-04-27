// features/careplans/data.ts
// Mock data for Care Plans page

export type PlanStatus = "Current" | "Review Due" | "Overdue" | "Pending" | "Draft";
export type PlanType = "Personal Care" | "Medication" | "Dementia Support" | "Nutrition" | "Mobility" | "Mental Wellbeing";

export interface CarePlan {
  id: string;
  patientName: string;
  patientAge: number;
  lastReviewedDate: string;
  lastReviewedBy: string;
  nextReview: string;
  status: PlanStatus;
  type: PlanType;
  goals: number;
  medications?: number;
  notes?: string;
  awaitingSignOff?: boolean;
}

export interface ReviewQueueItem {
  id: string;
  patientName: string;
  initials: string;
  planType: string;
  daysOverdue?: number;
  status: "Review" | "Approved";
  color: string;
}

export interface PlanTemplate {
  id: string;
  name: string;
  sections: number;
  patients: number;
  icon: string;
  color: string;
}

export const STATS = {
  totalPlans: 312,
  totalPatients: 142,
  dueForReview: 18,
  dueWithin7Days: 12,
  overdue: 7,
  actionNeeded: 7,
  pendingApproval: 4,
  awaitingSignOff: 4,
  avgPerPatient: 2.2,
};

export const CARE_PLANS: CarePlan[] = [
  {
    id: "1",
    patientName: "Margaret Johnson",
    patientAge: 74,
    lastReviewedDate: "6 Mar",
    lastReviewedBy: "Sarah W.",
    nextReview: "> 1yr",
    status: "Current",
    type: "Personal Care",
    goals: 4,
  },
  {
    id: "2",
    patientName: "Barbara Williams",
    patientAge: 68,
    lastReviewedDate: "15 Mar",
    lastReviewedBy: "Rebecca K.",
    nextReview: "8 goals",
    status: "Current",
    type: "Dementia Support",
    goals: 8,
  },
  {
    id: "3",
    patientName: "Henry Smith",
    patientAge: 81,
    lastReviewedDate: "22 Mar",
    lastReviewedBy: "",
    nextReview: "3 units",
    status: "Pending",
    type: "Mobility",
    goals: 3,
    awaitingSignOff: true,
  },
  {
    id: "4",
    patientName: "Arthur Wilson",
    patientAge: 69,
    lastReviewedDate: "19 Mar",
    lastReviewedBy: "Lucy C.",
    nextReview: "> 1yr",
    status: "Current",
    type: "Medication",
    medications: 4,
    goals: 4,
  },
  {
    id: "5",
    patientName: "Robert Ahmed",
    patientAge: 55,
    lastReviewedDate: "4 Mar",
    lastReviewedBy: "Priya R.",
    nextReview: "4 additional care",
    status: "Review Due",
    type: "Medication",
    goals: 4,
  },
  {
    id: "6",
    patientName: "Dorothy Chen",
    patientAge: 103,
    lastReviewedDate: "26 Feb",
    lastReviewedBy: "James O.",
    nextReview: "Overdue by 15 days",
    status: "Overdue",
    type: "Nutrition",
    goals: 6,
  },
  {
    id: "7",
    patientName: "Edna Morris",
    patientAge: 77,
    lastReviewedDate: "3 Mar",
    lastReviewedBy: "Sarah W.",
    nextReview: "2 goals",
    status: "Current",
    type: "Personal Care",
    goals: 2,
  },
  {
    id: "8",
    patientName: "Florence Adams",
    patientAge: 58,
    lastReviewedDate: "2 Mar",
    lastReviewedBy: "Sasha G.",
    nextReview: "Gen 3 (or home)",
    status: "Review Due",
    type: "Mental Wellbeing",
    goals: 1,
  },
];

export const REVIEW_QUEUE: ReviewQueueItem[] = [
  { id: "1", patientName: "Dorothy Chen", initials: "DC", planType: "Nutrition plan · 15", daysOverdue: 15, status: "Review", color: "#10B981" },
  { id: "2", patientName: "Robert Ahmed", initials: "RA", planType: "Medication plan · 12", daysOverdue: 12, status: "Review", color: "#10B981" },
  { id: "3", patientName: "Florence Adams", initials: "FA", planType: "Mental wellbeing · Due today", status: "Review", color: "#F59E0B" },
  { id: "4", patientName: "Henry Smith", initials: "HS", planType: "Mobility plan · Awaiting GM approval", status: "Approved", color: "#8B5CF6" },
];

export const PLAN_TEMPLATES: PlanTemplate[] = [
  { id: "1", name: "Personal Care", sections: 4, patients: 120, icon: "user", color: "#10B981" },
  { id: "2", name: "Medication", sections: 3, patients: 94, icon: "pill", color: "#3B82F6" },
  { id: "3", name: "Nutrition", sections: 5, patients: 42, icon: "leaf", color: "#F59E0B" },
  { id: "4", name: "Dementia", sections: 12, patients: 16, icon: "brain", color: "#EF4444" },
];

export const PLAN_TYPE_COUNTS = [
  { type: "Personal Care", count: 118, color: "#10B981" },
  { type: "Medication", count: 94, color: "#3B82F6" },
  { type: "Nutrition", count: 42, color: "#F59E0B" },
  { type: "Mobility", count: 21, color: "#F97316" },
  { type: "Dementia", count: 16, color: "#EF4444" },
  { type: "Other", count: 11, color: "#9CA3AF" },
];

export const FILTER_TABS = ["All Plans", "Current", "Review Due", "Overdue", "Pending", "Drafts"] as const;
export type FilterTab = typeof FILTER_TABS[number];
