"use client"
import { useState } from "react"
import {
  Check,
  Plus,
  FileText,
  Book,
  Database,
  Code,
  MoreHorizontal,
  Link,
  Search,
  Folder,
  FileJson,
  FileCode,
  Layers,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"

interface ContextPanelProps {
  selectedContexts: string[]
  onToggleContext: (context: string) => void
  onAddContext: (context: string) => void
}

export function ContextPanel({ selectedContexts, onToggleContext, onAddContext }: ContextPanelProps) {
  const [urlModalOpen, setUrlModalOpen] = useState(false)
  const [livingDocsModalOpen, setLivingDocsModalOpen] = useState(false)
  const [currentSource, setCurrentSource] = useState("")
  const [url, setUrl] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Default selected living docs
  const [selectedLivingDocs, setSelectedLivingDocs] = useState<string[]>([
    "Retirement Crystallisation Ser ..",
    "Switch Service",
  ])

  const confluenceItems = ["Retirement June Requirements", "Dealing Architecture", "Retirement Digital wireframes"]

  const jiraItems = ["RTR-1234 As a system user ...", "RTR-1234 As a retiring custom ..."]

  // All available living docs
  const allLivingDocs = [
    "Retirement Crystallisation Ser ..",
    "Switch Service",
    "Lumpsum investment",
    "Regular savings plan",
    "Withdrawal service",
    "Customer service V3",
    "Customer service V2",
    "Customer service V1",
    "Account service V2",
    "Account service V1",
    "Holding and Valuation",
    "Sonata Official Documentation",
    "Sonata LivingDocs",
    "API Documentation",
    "Integration Guide",
    "User Manual",
    "System Architecture",
    "Database Schema",
    "Microservices Map",
    "Frontend Components",
    "Backend Services",
  ]

  // Sort living docs to put selected ones at the top
  const sortedLivingDocs = [...allLivingDocs].sort((a, b) => {
    const aSelected = selectedLivingDocs.includes(a)
    const bSelected = selectedLivingDocs.includes(b)

    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1
    return a.localeCompare(b)
  })

  const filteredLivingDocs = sortedLivingDocs.filter((doc) => doc.toLowerCase().includes(searchTerm.toLowerCase()))

  const contextSources = [
    { name: "Jira", icon: <FileText className="h-4 w-4" />, needsUrl: true },
    { name: "Confluence", icon: <Book className="h-4 w-4" />, needsUrl: true },
    { name: "Living Docs", icon: <Code className="h-4 w-4" />, needsUrl: false },
    { name: "Designs", icon: <Layers className="h-4 w-4" />, needsUrl: true },
    { name: "Database", icon: <Database className="h-4 w-4" />, needsUrl: true },
    { name: "Others ...", icon: <MoreHorizontal className="h-4 w-4" />, needsUrl: true },
  ]

  const isSelected = (item: string) => selectedContexts.includes(item)
  const isLivingDocSelected = (doc: string) => selectedLivingDocs.includes(doc)

  const handleSourceClick = (source: string, needsUrl: boolean) => {
    if (source === "Living Docs") {
      setLivingDocsModalOpen(true)
    } else if (needsUrl) {
      setCurrentSource(source)
      setUrlModalOpen(true)
    } else {
      onAddContext(`New ${source} Item`)
    }
  }

  const handleUrlSubmit = () => {
    if (url.trim()) {
      onAddContext(`${currentSource}: ${url}`)
      setUrl("")
      setUrlModalOpen(false)
    }
  }

  const handleLivingDocToggle = (doc: string) => {
    if (isLivingDocSelected(doc)) {
      // Remove from selected living docs
      setSelectedLivingDocs(selectedLivingDocs.filter((d) => d !== doc))

      // Remove from context panel if it exists there
      if (selectedContexts.includes(doc)) {
        onToggleContext(doc)
      }
    } else {
      // Add to selected living docs
      setSelectedLivingDocs([...selectedLivingDocs, doc])

      // Add to context panel if not already there
      if (!selectedContexts.includes(doc)) {
        onAddContext(doc)
      }
    }
  }

  return (
    <div className="h-full border-r border-gray-200 p-4 overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
        <Folder className="h-5 w-5 mr-2 text-blue-600" />
        Context and MCPs
      </h2>

      {/* Confluence Section */}
      <div className="mb-6 group">
        <div className="flex items-center gap-2 mb-2">
          <Book className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-medium text-gray-800">Confluence</h3>
        </div>
        <ul className="space-y-2">
          {confluenceItems.map((item) => (
            <li key={item} className="flex items-start gap-2 group/item">
              <button
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  isSelected(item) ? "bg-blue-600 border-blue-600" : "border-gray-300"
                } group-hover/item:border-blue-400 transition-colors`}
                onClick={() => onToggleContext(item)}
              >
                {isSelected(item) && <Check className="h-3 w-3 text-white" />}
              </button>
              <span className="text-sm text-gray-700 group-hover/item:text-blue-700 transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Jira Section */}
      <div className="mb-6 group">
        <div className="flex items-center gap-2 mb-2">
          <FileJson className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-medium text-gray-800">Jira</h3>
        </div>
        <ul className="space-y-2">
          {jiraItems.map((item) => (
            <li key={item} className="flex items-start gap-2 group/item">
              <button
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  isSelected(item) ? "bg-blue-600 border-blue-600" : "border-gray-300"
                } group-hover/item:border-blue-400 transition-colors`}
                onClick={() => onToggleContext(item)}
              >
                {isSelected(item) && <Check className="h-3 w-3 text-white" />}
              </button>
              <span className="text-sm text-gray-700 group-hover/item:text-blue-700 transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Living Docs Section */}
      <div className="mb-6 group">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-medium text-gray-800">Living Docs</h3>
        </div>
        <ul className="space-y-2">
          {selectedLivingDocs
            .filter((doc) => selectedContexts.includes(doc))
            .map((item) => (
              <li key={item} className="flex items-start gap-2 group/item">
                <button
                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                    isSelected(item) ? "bg-blue-600 border-blue-600" : "border-gray-300"
                  } group-hover/item:border-blue-400 transition-colors`}
                  onClick={() => onToggleContext(item)}
                >
                  {isSelected(item) && <Check className="h-3 w-3 text-white" />}
                </button>
                <span className="text-sm text-gray-700 group-hover/item:text-blue-700 transition-colors">{item}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Add Other Context Section */}
      <div className="mt-8">
        <h3 className="text-base font-semibold mb-4 flex items-center text-gray-800">
          <Plus className="h-4 w-4 mr-2 text-blue-600" />
          Add Other Context
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {contextSources.map((source) => (
            <Button
              key={source.name}
              variant="outline"
              className="justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-gray-200 flex items-center gap-2 text-sm h-9 group transition-all duration-200 hover:border-blue-300"
              onClick={() => handleSourceClick(source.name, source.needsUrl)}
            >
              <span className="text-blue-600 group-hover:scale-110 transition-transform">{source.icon}</span>
              {source.name}
            </Button>
          ))}
        </div>
      </div>

      {/* URL Modal */}
      <Modal isOpen={urlModalOpen} onClose={() => setUrlModalOpen(false)} title={`Add ${currentSource} URL`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Enter URL
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <Button size="icon" variant="ghost">
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setUrlModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUrlSubmit}>Add</Button>
          </div>
        </div>
      </Modal>

      {/* Living Docs Modal */}
      <Modal
        isOpen={livingDocsModalOpen}
        onClose={() => {
          setLivingDocsModalOpen(false)
          setSearchTerm("")
        }}
        title="Select Living Docs"
        className="max-w-md"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto pr-1">
            <ul className="space-y-1">
              {filteredLivingDocs.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border cursor-pointer ${
                      isLivingDocSelected(doc) ? "bg-blue-600 border-blue-600" : "border-gray-300"
                    }`}
                    onClick={() => handleLivingDocToggle(doc)}
                  >
                    {isLivingDocSelected(doc) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <FileCode className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span
                    className="text-sm text-gray-700 cursor-pointer flex-grow"
                    onClick={() => handleLivingDocToggle(doc)}
                  >
                    {doc}
                  </span>
                </li>
              ))}
              {filteredLivingDocs.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500">No matching services found</li>
              )}
            </ul>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setLivingDocsModalOpen(false)
                setSearchTerm("")
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
