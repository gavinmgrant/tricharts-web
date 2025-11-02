"use client"

import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface SidebarProps {
  labels: {
    xLabel: string
    yLabel: string
    zLabel: string
    xLabels: string[]
    zLabels: string[]
  }
  setLabels: (labels: {
    xLabel: string
    yLabel: string
    zLabel: string
    xLabels: string[]
    zLabels: string[]
  }) => void
  rawInput: string
  handleRawChange: (value: string) => void
  rawXLabels: string
  rawZLabels: string
  barSpacing: number | string
  setBarSpacing: (spacing: number | string) => void
  showGrid: boolean
  setShowGrid: (showGrid: boolean) => void
  showLabels: boolean
  setShowLabels: (showLabels: boolean) => void
  handleLabelsChange: (value: string) => void
  handleZLabelsChange: (value: string) => void
}

export default function Sidebar({
  labels,
  setLabels,
  rawInput,
  handleRawChange,
  rawXLabels,
  rawZLabels,
  barSpacing,
  setBarSpacing,
  showGrid,
  setShowGrid,
  showLabels,
  setShowLabels,
  handleLabelsChange,
  handleZLabelsChange,
}: SidebarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabels({
      ...labels,
      [e.target.name]: e.target.value,
    })
  }
  const handleBarSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setBarSpacing("")
      return
    }
    setBarSpacing(Number(e.target.value))
  }

  return (
    <aside id="chart-form" className="w-full space-y-3">
      <Field>
        <FieldLabel>Data rows</FieldLabel>
        <FieldContent>
          <Textarea
            className="min-h-20"
            value={rawInput}
            onChange={(e) => handleRawChange(e.target.value)}
            placeholder={["22, 16, 10, 6, 2", "12, 10, 8, 6, 4"].join("\n")}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter multiple rows; each row becomes a series. Values can be comma
            or space separated.
          </p>
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Labels for x-axis</FieldLabel>
        <FieldContent>
          <Textarea
            className="min-h-20"
            value={rawXLabels}
            onChange={(e) => handleLabelsChange(e.target.value)}
            placeholder={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ].join("\n")}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter one label per line.
          </p>
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Labels for z-axis</FieldLabel>
        <FieldContent>
          <Textarea
            className="min-h-20"
            value={rawZLabels}
            onChange={(e) => handleZLabelsChange(e.target.value)}
            placeholder={["Week 1", "Week 2"].join("\n")}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter one label per line.
          </p>
        </FieldContent>
      </Field>
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Field>
          <FieldLabel>Label x-axis</FieldLabel>
          <FieldContent>
            <Input
              type="text"
              name="xLabel"
              value={labels.xLabel}
              onChange={handleChange}
              placeholder="Enter an x-axis label"
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Label y-axis</FieldLabel>
          <FieldContent>
            <Input
              type="text"
              name="yLabel"
              value={labels.yLabel}
              onChange={handleChange}
              placeholder="Enter a y-axis label"
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Label z-axis</FieldLabel>
          <FieldContent>
            <Input
              type="text"
              name="zLabel"
              value={labels.zLabel}
              onChange={handleChange}
              placeholder="Enter a z-axis label"
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      <FieldGroup className="grid grid-cols-3 gap-2">
        <Field>
          <FieldLabel>Bar spacing</FieldLabel>
          <FieldContent>
            <Input
              type="number"
              name="barSpacing"
              value={barSpacing}
              onChange={handleBarSpacingChange}
              step={0.25}
              min={0}
              max={10}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Show grid lines</FieldLabel>
          <FieldContent>
            <Switch
              checked={showGrid}
              onCheckedChange={(checked: boolean) => setShowGrid(checked)}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Show data labels</FieldLabel>
          <FieldContent>
            <Switch
              checked={showLabels}
              onCheckedChange={(checked: boolean) => setShowLabels(checked)}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
    </aside>
  )
}
