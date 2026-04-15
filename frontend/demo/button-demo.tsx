import { Button } from "@/src/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="space-y-8">

      <h1 className="text-xl font-bold">Buttons</h1>

      {/* PRIMARY */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Primary</p>
        <div className="flex items-end gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* SECONDARY */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Secondary</p>
        <div className="flex items-end gap-2">
          <Button variant="secondary" size="sm">Small</Button>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" size="lg">Large</Button>
        </div>
      </div>

      {/* GHOST */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Ghost</p>
        <div className="flex items-end gap-2 px-4 py-3">
          <Button variant="ghost" size="sm">Small</Button>
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" size="lg">Large</Button>
        </div>
      </div>

      {/* DESTRUCTIVE */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Destructive</p>
        <div className="flex items-end gap-2">
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive">Remove account</Button>
        </div>
      </div>

      {/* STATES */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">States</p>
        <div className="flex items-end gap-2">
          <Button focused>Focused</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </div>
      </div>

    </div>
  );
}