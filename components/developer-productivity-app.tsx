"use client"

import { useState, useEffect } from "react"
import { ContextPanel } from "./context-panel"
import { ChatPanel } from "./chat-panel"
import { OutputPanel } from "./output-panel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResizablePanel } from "./ui/resizable-panel"

export function DeveloperProductivityApp() {
  const [selectedContexts, setSelectedContexts] = useState<string[]>([
    "Retirement June Requirements",
    "Dealing Architecture",
    "Retirement Digital wireframes",
    "RTR-1234 As a system user ...",
    "RTR-1234 As a retiring custom ...",
    "Retirement Crystallisation Ser ..",
    "Switch Service",
  ])

  const [outputs, setOutputs] = useState<string[]>(["Test Scenarios.json", "Test Scripts"])
  const [currentTask, setCurrentTask] = useState("Generating test cases")
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState("create-test-scenarios")
  const [intentLabel, setIntentLabel] = useState("Create test scenarios")

  useEffect(() => {
    // Update the current task based on the selected intent
    setCurrentTask(intentLabel)
  }, [intentLabel])

  const handleAddContext = (context: string) => {
    if (!selectedContexts.includes(context)) {
      setSelectedContexts([...selectedContexts, context])
    }
  }

  const handleToggleContext = (context: string) => {
    if (selectedContexts.includes(context)) {
      setSelectedContexts(selectedContexts.filter((c) => c !== context))
    } else {
      setSelectedContexts([...selectedContexts, context])
    }
  }

  const handleGenerateOutput = (output: string) => {
    if (!outputs.includes(output)) {
      setOutputs([...outputs, output])
    }
    // In a real app, this would trigger the AI to generate content
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex w-full h-full relative">
        {/* Left Panel */}
        <ResizablePanel defaultWidth={350} minWidth={250} maxWidth={500} side="left" collapsed={leftPanelCollapsed}>
          <ContextPanel
            selectedContexts={selectedContexts}
            onToggleContext={handleToggleContext}
            onAddContext={handleAddContext}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-[-12px] z-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-md hover:bg-blue-50 transition-colors"
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            aria-label={leftPanelCollapsed ? "Expand left panel" : "Collapse left panel"}
          >
            {leftPanelCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </ResizablePanel>

        {/* Left Panel Expand Button (visible when collapsed) */}
        {leftPanelCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-4 z-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-md hover:bg-blue-50 transition-colors"
            onClick={() => setLeftPanelCollapsed(false)}
            aria-label="Expand left panel"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        )}

        {/* Middle Panel */}
        <div className="flex-grow h-full">
          <ChatPanel
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            onGenerateOutput={handleGenerateOutput}
            onIntentChange={(intent, label) => {
              setSelectedIntent(intent)
              setIntentLabel(label)
            }}
          />
        </div>

        {/* Right Panel */}
        <ResizablePanel defaultWidth={300} minWidth={250} maxWidth={500} side="right" collapsed={rightPanelCollapsed}>
          <OutputPanel outputs={outputs} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-[-12px] z-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-md hover:bg-blue-50 transition-colors"
            onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
            aria-label={rightPanelCollapsed ? "Expand right panel" : "Collapse right panel"}
          >
            {rightPanelCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        </ResizablePanel>

        {/* Right Panel Expand Button (visible when collapsed) */}
        {rightPanelCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-4 z-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-md hover:bg-blue-50 transition-colors"
            onClick={() => setRightPanelCollapsed(false)}
            aria-label="Expand right panel"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
