export type VisitStatus = "completed" | "in_progress" | "missed" | "scheduled"

export const galleryVisitRows: {
  id: string
  patient: string
  patientMeta: string
  patientInitials: string
  patientTone: string
  carer: string
  carerInitials: string
  carerTone: string
  window: string
  status: VisitStatus
  duration: string
  tasksDone: number
  tasksTotal: number
  progressClass: string
  defaultSelected?: boolean
}[] = [
  {
    id: "1",
    patient: "Margaret Johnson",
    patientMeta: "Personal care · 78y",
    patientInitials: "MJ",
    patientTone: "bg-brand-50 text-brand-600",
    carer: "Sarah Williams",
    carerInitials: "SW",
    carerTone: "bg-brand-50 text-brand-600",
    window: "08:00 – 08:30",
    status: "completed",
    duration: "32m",
    tasksDone: 8,
    tasksTotal: 8,
    progressClass: "bg-primary",
    defaultSelected: true,
  },
  {
    id: "2",
    patient: "Robert Ahmed",
    patientMeta: "Medication + meal · 82y",
    patientInitials: "RA",
    patientTone: "bg-cf-blue-50 text-[#3574D4]",
    carer: "Priya Patel",
    carerInitials: "PP",
    carerTone: "bg-cf-blue-50 text-[#3574D4]",
    window: "09:00 – 10:00",
    status: "in_progress",
    duration: "42m",
    tasksDone: 5,
    tasksTotal: 7,
    progressClass: "bg-cf-blue-500",
  },
  {
    id: "3",
    patient: "Dorothy Chen",
    patientMeta: "Personal care · 91y",
    patientInitials: "DC",
    patientTone: "bg-cf-red-50 text-[#A82B2B]",
    carer: "James Okafor",
    carerInitials: "JO",
    carerTone: "bg-cf-red-50 text-[#A82B2B]",
    window: "08:30 – 09:00",
    status: "missed",
    duration: "—",
    tasksDone: 0,
    tasksTotal: 0,
    progressClass: "bg-muted-foreground",
  },
  {
    id: "4",
    patient: "Barbara Williams",
    patientMeta: "Dementia support · 75y",
    patientInitials: "BW",
    patientTone: "bg-purple-50 text-purple-600",
    carer: "Fatima Khan",
    carerInitials: "FK",
    carerTone: "bg-purple-50 text-purple-600",
    window: "10:00 – 11:00",
    status: "scheduled",
    duration: "60m",
    tasksDone: 0,
    tasksTotal: 0,
    progressClass: "bg-muted-foreground",
  },
]

export const galleryMedicationRows: {
  name: string
  strength: string
  frequency: string
  nextDue: string
  stock: string
}[] = [
  {
    name: "Paracetamol",
    strength: "500mg",
    frequency: "08:00, 20:00",
    nextDue: "20:00",
    stock: "OK",
  },
  {
    name: "Atorvastatin",
    strength: "20mg",
    frequency: "Once daily",
    nextDue: "Tomorrow",
    stock: "Low",
  },
  {
    name: "Salbutamol inhaler",
    strength: "100mcg",
    frequency: "PRN",
    nextDue: "—",
    stock: "OK",
  },
]
