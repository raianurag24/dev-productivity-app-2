"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface ResizablePanelProps {
  children: React.ReactNode
  defaultWidth: number
  minWidth: number
  maxWidth: number
  side: "left" | "right"
  collapsed: boolean
}

export function ResizablePanel({ children, defaultWidth, minWidth, maxWidth, side, collapsed }: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const panelRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const panel = panelRef.current
    const resizer = resizerRef.current
    if (!panel || !resizer) return

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      isDragging.current = true
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const containerRect = panel.parentElement?.getBoundingClientRect()
      if (!containerRect) return

      let newWidth
      if (side === "left") {
        newWidth = e.clientX - containerRect.left
      } else {
        newWidth = containerRect.right - e.clientX
      }

      // Constrain width
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    resizer.addEventListener("mousedown", handleMouseDown)

    return () => {
      resizer.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [minWidth, maxWidth, side])

  return (
    <div
      ref={panelRef}
      className={`h-full relative transition-all duration-300 ${collapsed ? "w-0 overflow-hidden" : ""}`}
      style={{ width: collapsed ? 0 : width }}
    >
      {children}
      <div
        ref={resizerRef}
        className={`absolute top-0 ${
          side === "left" ? "right-0" : "left-0"
        } w-1 h-full cursor-col-resize hover:bg-blue-400 z-10 group`}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-16 bg-transparent group-hover:bg-blue-100 rounded-md"></div>
      </div>
    </div>
  )
}
