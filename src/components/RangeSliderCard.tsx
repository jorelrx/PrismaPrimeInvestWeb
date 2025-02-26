"use client"

import type React from "react"

import { HelpCircle } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RangerSlider } from "./ui/range-slider"

interface RangeSliderCardProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  formatValue: (value: number) => string
  label: string
  tooltip: string
}

export function RangeSliderCard({ min, max, step, value, onChange, formatValue, label, tooltip }: RangeSliderCardProps) {
  return (
    <div className="space-y-5 bg-white p-4 rounded-lg border border-gray-100">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>
        <RangerSlider min={min} max={max} step={step} value={value} onValueChange={onChange} />
      </div>
    </div>
  )
}

