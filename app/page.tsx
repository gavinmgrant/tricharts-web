"use client"

import Link from "next/link"
import { useState } from "react"
import { Bar3DChart, Surface3DChart } from "tricharts"
import {
  SquareArrowOutUpRightIcon,
  ArrowLeftToLineIcon,
  ArrowUpToLineIcon,
  ArrowRightToLineIcon,
  ArrowDownToLineIcon,
} from "lucide-react"

import Sidebar from "@/components/sidebar"
import { cn } from "@/lib/utils"

export default function Home() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [chartType, setChartType] = useState<"bar" | "surface">("bar")
  const [rawInput, setRawInput] = useState<string>(
    ["22, 16, 10, 6, 2", "12, 10, 8, 6, 4", "10, 8, 6, 4, 2", "8, 6, 12, 2, 1"].join("\n")
  )
  const [data, setData] = useState<number[][]>([
    [22, 16, 10, 6, 2],
    [12, 10, 8, 6, 4],
    [10, 8, 6, 4, 2],
    [8, 6, 12, 2, 1],
  ])
  const [rawXLabels, setRawXLabels] = useState<string>(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].join("\n")
  )
  const [rawZLabels, setRawZLabels] = useState<string>(
    ["Week 1", "Week 2", "Week 3", "Week 4"].join("\n")
  )
  const [labels, setLabels] = useState<{
    xLabel: string
    yLabel: string
    zLabel: string
    xLabels: string[]
    zLabels: string[]
  }>({
    xLabel: "Day",
    yLabel: "Amount",
    zLabel: "Week",
    xLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    zLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  })
  const [gridSpacing, setGridSpacing] = useState<number | string>(1)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const [showLabels, setShowLabels] = useState<boolean>(true)
  const [surfacePointRadius, setSurfacePointRadius] = useState<number | string>(
    ""
  )
  const [colorScheme, setColorScheme] = useState<
    "blue" | "green" | "red" | "purple" | "orange" | "rainbow" | "random"
  >("blue")

  const parseInput = (text: string): number[][] => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)

    const series: number[][] = lines
      .map((line) =>
        line
          .split(/[,\s]+/)
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
          .map((v) => Number(v))
          .filter((n) => Number.isFinite(n))
      )
      .filter((arr) => arr.length > 0)

    return series.length > 0 ? series : [[]]
  }

  const handleRawChange = (value: string) => {
    setRawInput(value)
    setData(parseInput(value))
  }

  const parseLabels = (value: string): string[] => {
    return value
      .split(/\r?\n/)
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
  }
  const handleLabelsChange = (value: string) => {
    setRawXLabels(value)
    setLabels({
      ...labels,
      xLabels: parseLabels(value),
    })
  }
  const handleZLabelsChange = (value: string) => {
    setRawZLabels(value)
    setLabels({
      ...labels,
      zLabels: parseLabels(value),
    })
  }

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black lg:h-screen h-auto">
      <main className="flex flex-col lg:flex-row flex-start items-start gap-4 sm:p-4 p-2 h-full">
        <div
          className={cn(
            "shrink-0 overflow-hidden transition-[width,max-height,opacity] duration-300 ease-in-out motion-reduce:transition-none",
            "lg:max-h-none",
            showSidebar
              ? "w-full max-h-[min(150vh,2600px)] opacity-100 lg:w-[400px]"
              : "pointer-events-none w-full max-h-0 opacity-0 lg:w-0"
          )}
          aria-hidden={!showSidebar}
        >
          <div className="w-full lg:w-[400px] border border-slate-200 rounded-md p-4 h-full flex flex-col justify-between gap-4 overflow-y-scroll lg:max-h-[calc(100vh-32px)]">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold leading-tight">TriCharts</h1>

              <Sidebar
                chartType={chartType}
                setChartType={setChartType}
                labels={labels}
                setLabels={setLabels}
                handleLabelsChange={handleLabelsChange}
                handleZLabelsChange={handleZLabelsChange}
                rawInput={rawInput}
                handleRawChange={handleRawChange}
                rawXLabels={rawXLabels}
                rawZLabels={rawZLabels}
                gridSpacing={gridSpacing}
                setGridSpacing={setGridSpacing}
                showGrid={showGrid}
                setShowGrid={setShowGrid}
                showLabels={showLabels}
                setShowLabels={setShowLabels}
                surfacePointRadius={surfacePointRadius}
                setSurfacePointRadius={setSurfacePointRadius}
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="https://www.npmjs.com/package/tricharts"
                target="_blank"
                className="w-full"
              >
                <div className="flex items-center justify-between bg-zinc-100 rounded-md px-3 py-2 cursor-pointer hover:bg-zinc-200 transition-colors">
                  <p>npm package</p>
                  <SquareArrowOutUpRightIcon className="size-4" />
                </div>
              </Link>
              <Link
                href="https://github.com/gavinmgrant/tricharts"
                target="_blank"
                className="w-full"
              >
                <div className="flex items-center justify-between bg-zinc-100 rounded-md px-3 py-2 cursor-pointer hover:bg-zinc-200 transition-colors">
                  <p>GitHub repository</p>
                  <SquareArrowOutUpRightIcon className="size-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "border border-slate-200 rounded-md w-full min-w-0 flex-1 min-h-[400px] h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] lg:h-full mb-6 lg:mb-0 relative"
          )}
        >
          {showSidebar ? (
            <div
              className="group flex items-center gap-1.5 absolute top-2 left-2 sm:left-4 sm:top-4 z-10 cursor-pointer px-3 py-2 bg-zinc-100 rounded-md hover:bg-zinc-200 transition-colors"
              onClick={() => setShowSidebar(false)}
            >
              <ArrowLeftToLineIcon className="w-5 h-5 hidden lg:block" />
              <ArrowUpToLineIcon className="w-5 h-5 block lg:hidden" />
              <p className="text-sm hidden group-hover:block animate-fade-in">Hide settings</p>
            </div>
          ) : (
            <div
              className="group flex items-center gap-1.5 absolute top-2 left-2 sm:left-4 sm:top-4 z-10 cursor-pointer px-3 py-2 bg-zinc-100 rounded-md hover:bg-zinc-200 transition-colors"
              onClick={() => setShowSidebar(true)}
            >
              <ArrowRightToLineIcon className="w-5 h-5 hidden lg:block" />
              <ArrowDownToLineIcon className="w-5 h-5 block lg:hidden" />
              <p className="text-sm hidden group-hover:block animate-fade-in">Show settings</p>
            </div>
          )}
          {chartType === "bar" ? (
            <Bar3DChart
              data={data}
              xLabel={labels.xLabel}
              yLabel={labels.yLabel}
              zLabel={labels.zLabel}
              xLabels={labels.xLabels}
              zLabels={labels.zLabels}
              gridSpacing={Number(gridSpacing)}
              showGrid={showGrid}
              showLabels={showLabels}
              colorScheme={colorScheme}
            />
          ) : (
            <Surface3DChart
              data={data}
              xLabel={labels.xLabel}
              yLabel={labels.yLabel}
              zLabel={labels.zLabel}
              xLabels={labels.xLabels}
              zLabels={labels.zLabels}
              gridSpacing={Number(gridSpacing)}
              showGrid={showGrid}
              showLabels={showLabels}
              colorScheme={colorScheme}
              surfacePointRadius={
                surfacePointRadius === ""
                  ? undefined
                  : Number(surfacePointRadius)
              }
            />
          )}
        </div>
      </main>
    </div>
  )
}
