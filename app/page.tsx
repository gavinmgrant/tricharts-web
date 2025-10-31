"use client"

import Link from "next/link"
import { useState } from "react"
import { Bar3DChart } from "tricharts"
import { SquareArrowOutUpRightIcon } from "lucide-react"

import Sidebar from "@/components/sidebar"

export default function Home() {
  const [rawInput, setRawInput] = useState<string>(
    ["22, 19, 13, 5, 2", "16, 14, 10, 3, 4"].join("\n")
  )
  const [data, setData] = useState<number[][]>([
    [22, 19, 13, 5, 2],
    [16, 14, 10, 3, 4],
  ])
  const [labels, setLabels] = useState<{
    xLabel: string
    yLabel: string
    zLabel: string
  }>({
    xLabel: "",
    yLabel: "",
    zLabel: "",
  })
  const [barSpacing, setBarSpacing] = useState<number | string>(1)
  const [showGrid, setShowGrid] = useState<boolean>(true)

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

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black lg:h-screen h-auto">
      <main className="flex flex-col lg:flex-row flex-start items-start gap-4 sm:p-4 p-2 h-full">
        <div className="w-full lg:w-[300px] shrink-0 border border-slate-200 rounded-md p-4 h-full flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-between">
              <h1 className="text-2xl font-bold">TriCharts</h1>
            </div>

            <Sidebar
              labels={labels}
              setLabels={setLabels}
              rawInput={rawInput}
              handleRawChange={handleRawChange}
              barSpacing={barSpacing}
              setBarSpacing={setBarSpacing}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
            />
          </div>

          <div className="flex flex-col gap-2 items-start text-sm">
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

        <div className="border border-slate-200 rounded-md w-full h-[400px] lg:h-full mb-6 lg:mb-0">
          <Bar3DChart
            data={data}
            xLabel={labels.xLabel}
            yLabel={labels.yLabel}
            zLabel={labels.zLabel}
            barSpacing={Number(barSpacing)}
            showGrid={showGrid}
          />
        </div>
      </main>
    </div>
  )
}
