"use client"

import { BellIcon, SearchIcon } from "lucide-react"
import * as React from "react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
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
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

export default function UiGalleryPage() {
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
          <div className="space-y-2">
            <Label htmlFor="g-name">Full name</Label>
            <Input id="g-name" placeholder="Jane Cooper" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="g-notes">Notes</Label>
            <Textarea id="g-notes" rows={3} placeholder="Visit notes…" />
          </div>
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
            <Progress value={progress} />
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
          <Chip tone="warning" onDismiss={() => undefined}>
            Removable
          </Chip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Avatar group</h2>
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
        <h2 className="font-heading text-lg font-bold">Card</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Patient profile</CardTitle>
            <CardDescription>Summary card example</CardDescription>
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
        <Alert className="max-w-lg">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            This is an informational alert using CareFlow styles.
          </AlertDescription>
        </Alert>
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

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>M. Johnson</TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
