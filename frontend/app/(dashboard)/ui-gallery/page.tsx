"use client"

import {
  AlertCircle,
  AlertTriangle,
  BellIcon,
  Check,
  Info,
  MoreHorizontal,
  SearchIcon,
} from "lucide-react"
import * as React from "react"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarStatus,
  AvatarWrap,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Chip } from "@/components/ui/chip"
import { DatePicker } from "@/components/ui/date-picker"
import { EmptyState } from "@/components/ui/empty-state"
import { Field, FieldDescription } from "@/components/ui/field"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import {
  StatCard,
  StatCardHeader,
  StatCardIcon,
  StatCardLabel,
  StatCardTrend,
  StatCardValue,
} from "@/components/ui/stat-card"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

type VisitStatus = "completed" | "in_progress" | "missed" | "scheduled"

const galleryVisitRows: {
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

const galleryMedicationRows: {
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

function visitStatusBadge(status: VisitStatus) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="softSuccess" dot>
          Completed
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="softInfo" dot>
          In progress
        </Badge>
      )
    case "missed":
      return (
        <Badge variant="softDanger" dot>
          Missed
        </Badge>
      )
    case "scheduled":
      return (
        <Badge variant="softMuted" dot>
          Scheduled
        </Badge>
      )
  }
}

export default function UiGalleryPage() {
  const statMetricLabelId = React.useId()
  const [date, setDate] = React.useState<Date | undefined>()
  const [progress, setProgress] = React.useState(40)
  const [slider, setSlider] = React.useState([30])

  return (
    <div className="cf-container max-w-4xl space-y-12 py-8">
      <div>
        <h1 className="font-heading text-cf-h2 font-bold">UI gallery</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Internal preview of CareFlow shadcn components.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="brandOutline">Brand outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="xl">Extra large</Button>
          <Button loading>Loading</Button>
        </div>
        <ButtonGroup>
          <Button variant="secondary" size="sm">
            Prev
          </Button>
          <Button variant="secondary" size="sm">
            Step 2
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </ButtonGroup>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Icon buttons</h2>
        <div className="flex flex-wrap items-center gap-2">
          <IconButton aria-label="Search" variant="outline" size="sm">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="Notifications" variant="ghost">
            <BellIcon />
          </IconButton>
          <IconButton aria-label="Add" variant="solid" size="lg">
            <SearchIcon />
          </IconButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Forms</h2>
        <div className="grid max-w-md gap-4">
          <Field>
            <Label htmlFor="g-name" required>
              Full name
            </Label>
            <Input id="g-name" placeholder="Jane Cooper" />
            <FieldDescription>Use the name on the care record.</FieldDescription>
          </Field>
          <Field>
            <Label htmlFor="g-nickname" optional>
              Preferred name
            </Label>
            <Input id="g-nickname" placeholder="Jay" />
          </Field>
          <Field>
            <Label htmlFor="g-notes">Notes</Label>
            <Textarea id="g-notes" rows={3} placeholder="Visit notes…" />
            <FieldDescription tone="success">
              Autosaves while you type.
            </FieldDescription>
          </Field>
          <Field>
            <Label htmlFor="g-code">Access code</Label>
            <Input id="g-code" placeholder="0000" aria-invalid />
            <FieldDescription tone="error">Must be four digits.</FieldDescription>
          </Field>
          <div className="flex items-center gap-2">
            <Checkbox id="g-agree" />
            <Label htmlFor="g-agree">Agree to terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="g-active" />
            <Label htmlFor="g-active">Active</Label>
          </div>
          <RadioGroup defaultValue="a" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="g-a" />
              <Label htmlFor="g-a">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="g-b" />
              <Label htmlFor="g-b">Option B</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label>Date</Label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="space-y-2">
            <Label>Slider</Label>
            <Slider
              value={slider}
              onValueChange={(v) =>
                setSlider(Array.isArray(v) ? [...v] : [v])
              }
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Progress</Label>
            <div className="space-y-3">
              <Progress value={progress} trackSize="sm" />
              <Progress value={progress} />
              <Progress value={progress} trackSize="lg" />
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 10))}
            >
              Bump
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Badges & chips</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Chip tone="success">Active</Chip>
          <Chip
            tone="warning"
            accessibleLabel="Shift filter"
            onDismiss={() => undefined}
          >
            <span className="inline-flex items-center gap-1">
              <span aria-hidden>·</span> Shift
            </span>
          </Chip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Avatars</h2>
        <p className="text-xs text-muted-foreground">
          Sizes (HTML xs → xl), square default, and round + status.
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <Avatar size="xs">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <AvatarWrap>
            <Avatar shape="round" size="lg">
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <AvatarStatus tone="blue" />
          </AvatarWrap>
        </div>
        <h3 className="text-sm font-semibold">Avatar group</h3>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Cards</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="default" className="max-w-md">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Border + surface</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Base card variant.</p>
            </CardContent>
          </Card>
          <Card variant="elevated" className="max-w-md">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Shadow + light border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Matches HTML `.card-elevated`.
              </p>
            </CardContent>
          </Card>
          <Card
            variant="interactive"
            className="max-w-md"
            aria-label="Open visit summary (demo)"
            onClick={() => toast("Interactive card activated")}
          >
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>
                Click or press Enter or Space — keyboard focus ring.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pointer and hover shadow; uses role button when onClick is set.
              </p>
            </CardContent>
          </Card>
          <Card variant="outlined" className="max-w-md">
            <CardHeader>
              <CardTitle>Outlined</CardTitle>
              <CardDescription>Emphasis ring</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Selected / highlighted state.
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Patient profile</CardTitle>
            <CardDescription>With footer actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Content uses design tokens.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Open</Button>
            <Button size="sm" variant="secondary">
              Dismiss
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Alert & toast</h2>
        <div className="flex max-w-lg flex-col gap-3">
          <Alert variant="success">
            <AlertIcon>
              <Check aria-hidden />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Visit completed</AlertTitle>
              <AlertDescription>
                Notes were saved to the patient timeline.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="info">
            <AlertIcon>
              <Info aria-hidden />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                This is an informational alert using CareFlow styles.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="warning">
            <AlertIcon>
              <AlertTriangle aria-hidden />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Review medication</AlertTitle>
              <AlertDescription>
                One dose is due within the hour.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="error">
            <AlertIcon>
              <AlertCircle aria-hidden />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Sync failed</AlertTitle>
              <AlertDescription>Try again or contact support.</AlertDescription>
            </AlertContent>
          </Alert>
        </div>
        <Button type="button" variant="secondary" onClick={() => toast("Saved")}>
          Show toast
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Tabs</h2>
        <Tabs defaultValue="one" className="max-w-md">
          <TabsList>
            <TabsTrigger value="one">Visits</TabsTrigger>
            <TabsTrigger value="two">Medication</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Visits content</TabsContent>
          <TabsContent value="two">Medication content</TabsContent>
        </Tabs>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="font-heading text-lg font-bold">Tables</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            <code className="text-xs">variant=&quot;data&quot;</code> matches HTML{" "}
            <code className="text-xs">.data-table</code> (rounded header, row
            hover on cells).{" "}
            <code className="text-xs">variant=&quot;minimal&quot;</code> is a
            compact border-row layout for dense lists.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Data · visits roster</h3>
          <Table variant="data">
            <TableCaption className="text-left">
              Sample dataset: morning visits (checkbox + avatars + badges +
              inline progress).
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Select all" />
                </TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Carer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryVisitRows.map((row) => {
                const pct =
                  row.tasksTotal > 0
                    ? Math.round((row.tasksDone / row.tasksTotal) * 100)
                    : 0
                return (
                  <TableRow key={row.id}>
                    <TableCell className="w-10">
                      <Checkbox
                        defaultChecked={row.defaultSelected}
                        aria-label={`Select ${row.patient}`}
                      />
                    </TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal">
                      <div className="flex items-center gap-2.5">
                        <Avatar shape="round" size="sm">
                          <AvatarFallback className={row.patientTone}>
                            {row.patientInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground">
                            {row.patient}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {row.patientMeta}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <div className="flex items-center gap-1.5">
                        <Avatar shape="round" size="xs">
                          <AvatarFallback className={row.carerTone}>
                            {row.carerInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{row.carer}</span>
                      </div>
                    </TableCell>
                    <TableCell>{row.window}</TableCell>
                    <TableCell>{visitStatusBadge(row.status)}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                      {row.tasksTotal > 0 ? (
                        <div className="flex items-center gap-2">
                          <Progress
                            value={pct}
                            trackSize="sm"
                            className="w-[60px] gap-0"
                          >
                            <ProgressTrack>
                              <ProgressIndicator
                                className={row.progressClass}
                              />
                            </ProgressTrack>
                          </Progress>
                          <span className="text-[11px] text-muted-foreground">
                            {row.tasksDone}/{row.tasksTotal}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Not started
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="w-12 text-right">
                      <IconButton
                        aria-label="Row actions"
                        variant="ghost"
                        size="sm"
                      >
                        <MoreHorizontal />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">
            Showing <strong>1–4</strong> of <strong>127</strong> visits (mock).
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Minimal · medication review</h3>
          <Table variant="minimal" className="max-w-xl">
            <TableCaption className="text-left">
              MAR excerpt — different column set.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Next</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryMedicationRows.map((m) => (
                <TableRow key={m.name}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.strength}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {m.frequency}
                  </TableCell>
                  <TableCell>{m.nextDue}</TableCell>
                  <TableCell>
                    {m.stock === "Low" ? (
                      <Badge variant="softWarning">Low</Badge>
                    ) : (
                      <Badge variant="softSuccess">OK</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Skeleton</h2>
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Stat card</h2>
        <StatCard
          className="max-w-sm"
          aria-labelledby={statMetricLabelId}
        >
          <StatCardHeader>
            <StatCardIcon tone="brand">
              <Check aria-hidden className="size-[18px]" strokeWidth={2} />
            </StatCardIcon>
          </StatCardHeader>
          <StatCardLabel id={statMetricLabelId}>Visits today</StatCardLabel>
          <StatCardValue>127</StatCardValue>
          <StatCardTrend>
            <Badge variant="secondary" className="gap-1">
              <Check className="size-2.5" strokeWidth={3} aria-hidden />
              96.1%
            </Badge>
            <span>vs last week</span>
          </StatCardTrend>
        </StatCard>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Empty state</h2>
        <EmptyState
          title="No patients yet"
          description="Add a patient to see them listed here."
        >
          <Button size="sm">Add patient</Button>
        </EmptyState>
      </section>

      <Separator />
      <p className="text-xs text-muted-foreground">End of gallery</p>
    </div>
  )
}
