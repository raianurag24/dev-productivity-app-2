"use client"

import { FileText, FileJson, FileCode, Download, Trash2, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OutputPanelProps {
  outputs: string[]
}

export function OutputPanel({ outputs }: OutputPanelProps) {
  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".json")) return <FileJson className="h-5 w-5 text-blue-600" />
    if (filename.endsWith(".js") || filename.endsWith(".ts")) return <FileCode className="h-5 w-5 text-blue-600" />
    return <FileText className="h-5 w-5 text-blue-600" />
  }

  return (
    <div className="h-full p-4 overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
        <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
        Files/ Outputs
      </h2>

      <ul className="space-y-3">
        {outputs.map((output) => (
          <li
            key={output}
            className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center gap-2">
              {getFileIcon(output)}
              <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">{output}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7 text-gray-500 hover:text-blue-600">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-gray-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
