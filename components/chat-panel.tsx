"use client"

import { useState, useEffect } from "react"
import {
  Send,
  MessageSquare,
  FileText,
  FileIcon as FileWord,
  FileJson,
  FileSpreadsheet,
  Github,
  Code,
  Sparkles,
  Bot,
  User,
  Cpu,
  UserCog,
  Briefcase,
  TestTube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { JSX } from "react"

interface ChatPanelProps {
  currentTask: string
  setCurrentTask: (task: string) => void
  onGenerateOutput: (output: string) => void
  onIntentChange: (intent: string, label: string) => void
}

export function ChatPanel({ currentTask, setCurrentTask, onGenerateOutput, onIntentChange }: ChatPanelProps) {
  const [message, setMessage] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [selectedRole, setSelectedRole] = useState("business-analyst")
  const [selectedIntent, setSelectedIntent] = useState("create-jira-bdd")
  const [selectedFormat, setSelectedFormat] = useState("chat")

  // Lorem Ipsum text to append to prompts
  const loremIpsum = `
... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
  `

  const models = [
    { value: "gpt-4o", label: "GPT-4o", icon: <Cpu className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "o3-mini", label: "O3-mini", icon: <Cpu className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "claude-3.5", label: "Claude 3.5", icon: <Cpu className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "claude-3.7", label: "Claude 3.7", icon: <Cpu className="h-4 w-4 mr-2 text-blue-600" /> },
  ]

  const roles = [
    {
      value: "business-analyst",
      label: "Business Analyst",
      icon: <Briefcase className="h-4 w-4 mr-2 text-blue-600" />,
      defaultModel: "gpt-4o",
      defaultIntent: "create-jira-bdd",
    },
    {
      value: "quality-analyst",
      label: "Quality Analyst",
      icon: <TestTube className="h-4 w-4 mr-2 text-blue-600" />,
      defaultModel: "claude-3.5",
      defaultIntent: "create-test-scenarios",
    },
    {
      value: "project-manager",
      label: "Project Manager",
      icon: <UserCog className="h-4 w-4 mr-2 text-blue-600" />,
      defaultModel: "gpt-4o",
      defaultIntent: "create-timeline",
    },
    {
      value: "general-user",
      label: "General User",
      icon: <User className="h-4 w-4 mr-2 text-blue-600" />,
      defaultModel: "gpt-4o",
      defaultIntent: "summarize-docs",
    },
  ]

  const intentsByRole: Record<string, { value: string; label: string; icon: JSX.Element; prompt: string }[]> = {
    "business-analyst": [
      {
        value: "create-jira-bdd",
        label: "Create Jira story and test scenarios in BDD format",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a business analyst expert. Please take the Confluence, Jira, and Living Docs in the context and create a comprehensive Jira story with acceptance criteria and test scenarios in BDD format (Given-When-Then). Include all functional requirements and edge cases.${loremIpsum}`,
      },
      {
        value: "write-requirements",
        label: "Write Requirements doc from meeting transcript",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a requirements documentation expert. Please take the Confluence, Jira, and Living Docs in the context and create a detailed requirements document based on the meeting transcripts. Include functional and non-functional requirements, assumptions, and dependencies.${loremIpsum}`,
      },
      {
        value: "analyze-requirements",
        label: "Analyze requirement",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a requirements analysis expert. Please take the Confluence, Jira, and Living Docs in the context and analyze the requirements for completeness, consistency, and feasibility. Identify any gaps, contradictions, or implementation challenges.${loremIpsum}`,
      },
      {
        value: "suggest-gaps",
        label: "Suggest requirement gaps",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a requirements gap analysis expert. Please take the Confluence, Jira, and Living Docs in the context and identify any missing requirements, edge cases, or scenarios that haven't been addressed. Suggest improvements to make the requirements more comprehensive.${loremIpsum}`,
      },
      {
        value: "enhance-documentation",
        label: "Enhance documentation",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a documentation enhancement expert. Please take the Confluence, Jira, and Living Docs in the context and improve the existing documentation by adding clarity, examples, diagrams descriptions, and better structure. Ensure all technical terms are explained.${loremIpsum}`,
      },
    ],
    "quality-analyst": [
      {
        value: "create-test-scenarios",
        label: "Create test scenarios",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a quality expert. Please take the Confluence, Jira, and Living Docs in the context and create comprehensive test scenarios covering all functional paths, edge cases, and error conditions. Include preconditions, test steps, and expected results for each scenario.${loremIpsum}`,
      },
      {
        value: "create-edge-cases",
        label: "Create edge test cases",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a quality expert specializing in edge case testing. Please take the Confluence, Jira, and Living Docs in the context and identify all possible edge cases and boundary conditions. Create detailed test cases for each edge scenario, including data validation, error handling, and performance under stress.${loremIpsum}`,
      },
      {
        value: "write-test-scripts",
        label: "Write test scripts",
        icon: <Code className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a test automation expert. Please take the Confluence, Jira, and Living Docs in the context and write automated test scripts that can verify the functionality. Include setup, execution, verification, and teardown steps in your scripts.${loremIpsum}`,
      },
      {
        value: "test-coverage-analysis",
        label: "Test coverage analysis",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a test coverage analysis expert. Please take the Confluence, Jira, and Living Docs in the context and analyze the current test coverage. Identify any gaps in testing and suggest additional test cases to improve coverage across functional, performance, security, and usability aspects.${loremIpsum}`,
      },
    ],
    "project-manager": [
      {
        value: "create-timeline",
        label: "Create project timeline",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a project management expert. Please take the Confluence, Jira, and Living Docs in the context and create a detailed project timeline with milestones, dependencies, and resource allocations. Include estimates for each phase and identify critical path activities.${loremIpsum}`,
      },
      {
        value: "risk-assessment",
        label: "Risk assessment",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a risk management expert. Please take the Confluence, Jira, and Living Docs in the context and conduct a comprehensive risk assessment. Identify potential risks, evaluate their impact and probability, and suggest mitigation strategies for each risk.${loremIpsum}`,
      },
      {
        value: "resource-allocation",
        label: "Resource allocation",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a resource management expert. Please take the Confluence, Jira, and Living Docs in the context and create an optimal resource allocation plan. Consider skill requirements, availability, and workload balancing to ensure efficient project execution.${loremIpsum}`,
      },
      {
        value: "status-report",
        label: "Generate status report",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a project reporting expert. Please take the Confluence, Jira, and Living Docs in the context and generate a comprehensive status report. Include progress against plan, accomplishments, issues, risks, and next steps. Provide both executive summary and detailed sections.${loremIpsum}`,
      },
    ],
    "general-user": [
      {
        value: "summarize-docs",
        label: "Summarize documentation",
        icon: <FileText className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a documentation expert. Please take the Confluence, Jira, and Living Docs in the context and create a concise summary of the key information. Highlight the most important points, requirements, and decisions while maintaining accuracy.${loremIpsum}`,
      },
      {
        value: "explain-code",
        label: "Explain code",
        icon: <Code className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a code explanation expert. Please take the Confluence, Jira, and Living Docs in the context and provide a clear, detailed explanation of the code. Break down complex logic, explain design patterns used, and highlight important implementation details.${loremIpsum}`,
      },
      {
        value: "suggest-improvements",
        label: "Suggest improvements",
        icon: <Sparkles className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are an improvement and optimization expert. Please take the Confluence, Jira, and Living Docs in the context and suggest practical improvements to the current approach. Consider performance, maintainability, user experience, and best practices in your suggestions.${loremIpsum}`,
      },
      {
        value: "generate-code",
        label: "Generate code",
        icon: <Code className="h-4 w-4 mr-2 text-blue-600" />,
        prompt: `You are a code generation expert. Please take the Confluence, Jira, and Living Docs in the context and generate high-quality, well-documented code that implements the requirements. Follow best practices, include error handling, and optimize for performance and maintainability.${loremIpsum}`,
      },
    ],
  }

  const formats = [
    { value: "chat", label: "Chat Window", icon: <MessageSquare className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "txt", label: "Text File", icon: <FileText className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "docx", label: "Word Document", icon: <FileWord className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "json", label: "JSON", icon: <FileJson className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "excel", label: "Excel", icon: <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "jira", label: "New Jira", icon: <FileText className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "github", label: "GitHub Repo", icon: <Github className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "markdown", label: "Markdown", icon: <FileText className="h-4 w-4 mr-2 text-blue-600" /> },
    { value: "html", label: "HTML", icon: <Code className="h-4 w-4 mr-2 text-blue-600" /> },
  ]

  // Update prompt when intent changes
  useEffect(() => {
    const currentIntent = intentsByRole[selectedRole]?.find((i) => i.value === selectedIntent)
    if (currentIntent) {
      setMessage(currentIntent.prompt)
    }
  }, [selectedIntent, selectedRole])

  // Update the task label when intent changes
  useEffect(() => {
    const currentIntentObj = intentsByRole[selectedRole]?.find((i) => i.value === selectedIntent)
    if (currentIntentObj) {
      onIntentChange(selectedIntent, currentIntentObj.label)
    }
  }, [selectedIntent, selectedRole, onIntentChange])

  const handleSubmit = () => {
    if (!message.trim()) return

    // Generate a filename based on the selected options
    const filename = `${selectedIntent.replace(/-/g, "_")}.${selectedFormat}`
    onGenerateOutput(filename)

    // Reset the message to the prompt template
    const currentIntent = intentsByRole[selectedRole]?.find((i) => i.value === selectedIntent)
    if (currentIntent) {
      setMessage(currentIntent.prompt)
    } else {
      setMessage("")
    }
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value)

    // Set default model based on role
    const role = roles.find((r) => r.value === value)
    if (role) {
      setSelectedModel(role.defaultModel)

      // Set default intent for this role
      if (intentsByRole[value] && intentsByRole[value].length > 0) {
        const defaultIntent = role.defaultIntent || intentsByRole[value][0].value
        setSelectedIntent(defaultIntent)
      }
    }
  }

  const handleIntentChange = (value: string) => {
    setSelectedIntent(value)
    // Find the label for this intent
    const intentObj = intentsByRole[selectedRole]?.find((i) => i.value === value)
    if (intentObj) {
      onIntentChange(value, intentObj.label)
      setMessage(intentObj.prompt)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white to-blue-50">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-blue-600 animate-pulse" />
        <h1 className="text-xl font-semibold text-gray-900">{currentTask}</h1>
      </div>

      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="grid grid-cols-4 gap-4">
          {/* Role dropdown (1st position) */}
          <div>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors group">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value} className="flex items-center">
                    <div className="flex items-center">
                      {role.icon}
                      {role.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intent/Task dropdown (2nd position) */}
          <div>
            <Select value={selectedIntent} onValueChange={handleIntentChange}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors group">
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent>
                {intentsByRole[selectedRole]?.map((intent) => (
                  <SelectItem key={intent.value} value={intent.value} className="flex items-center">
                    <div className="flex items-center">
                      {intent.icon}
                      {intent.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model dropdown (3rd position) */}
          <div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors group">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value} className="flex items-center">
                    <div className="flex items-center">
                      {model.icon}
                      {model.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format dropdown (4th position) */}
          <div>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors group">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value} className="flex items-center">
                    <div className="flex items-center">
                      {format.icon}
                      {format.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Chat messages would go here */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-sm text-gray-700">
                I'll help you with your task. Please review the pre-populated prompt below and click Go when ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="min-h-[200px] mb-4 bg-white border-gray-200 focus:border-blue-500 transition-colors"
        />

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="px-8 bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-md group"
          >
            <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
            Go
          </Button>
        </div>
      </div>
    </div>
  )
}
