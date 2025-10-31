"use client"

import * as React from "react"

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
  labels: { xLabel: string; yLabel: string; zLabel: string }
  setLabels: (labels: {
    xLabel: string
    yLabel: string
    zLabel: string
  }) => void
  rawInput: string
  handleRawChange: (value: string) => void
  barSpacing: number | string
  setBarSpacing: (spacing: number | string) => void
  showGrid: boolean
  setShowGrid: (showGrid: boolean) => void
}

export default function Sidebar({
  labels,
  setLabels,
  rawInput,
  handleRawChange,
  barSpacing,
  setBarSpacing,
  showGrid,
  setShowGrid,
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
  const handleShowGridChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrid(e.target.checked)
  }

  return (
    <aside id="chart-form" className="w-full space-y-4">
      <FieldGroup className="space-y-2">
        <Field>
          <FieldLabel>Label for x-axis</FieldLabel>
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
          <FieldLabel>Label for y-axis</FieldLabel>
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
          <FieldLabel>Label for z-axis</FieldLabel>
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
          <FieldLabel>Show grid</FieldLabel>
          <FieldContent>
            <Switch
              checked={showGrid}
              onCheckedChange={(checked: boolean) => setShowGrid(checked)}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      <Field>
        <FieldLabel>Data rows</FieldLabel>
        <FieldContent>
          <Textarea
            className="min-h-20"
            value={rawInput}
            onChange={(e) => handleRawChange(e.target.value)}
            placeholder={[
              "12, 19, 3, 5, 2",
              "22, 12, 15, 5, 9",
              "8, 14, 22, 7, 11",
            ].join("\n")}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Enter multiple rows; each row becomes a series. Values can be comma
            or space separated.
          </p>
        </FieldContent>
      </Field>
    </aside>
  )
}
