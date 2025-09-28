"use client"

import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwapButtonProps {
  onSwap: () => void
  className?: string
}

export function SwapButton({ onSwap, className = "" }: SwapButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onSwap}
      className={`h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-200 ${className}`}
      title="Swap pickup and destination"
    >
      <ArrowLeftRight className="h-4 w-4 text-primary" />
    </Button>
  )
}