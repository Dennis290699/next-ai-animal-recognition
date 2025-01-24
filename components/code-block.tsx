"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Terminal } from "lucide-react"
import Image from "next/image"

interface CodeBlockProps {
  code: string
  language: string
  output: string
  imageUrl?: string 
}

export function CodeBlock({ code, language, output, imageUrl }: CodeBlockProps) {
  const [showOutput, setShowOutput] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setShowOutput(true)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <pre className={`p-4 rounded-md overflow-x-auto ${language}`}>
        <code>{code}</code>
      </pre>
      <div className="flex flex-col space-y-2">
        <Button onClick={runCode} disabled={isRunning} className="w-full sm:w-auto">
          {isRunning ? (
            <>
              <Terminal className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Code className="mr-2 h-4 w-4" />
              Run Block
            </>
          )}
        </Button>
        {showOutput && (
          <div className="p-4 bg-black text-green-400 rounded-md overflow-auto max-h-64">
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <code>{output}</code>
            </pre>
            {imageUrl && (
              <div className="mt-4">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Output image"
                  width={300}
                  height={200}
                  className="rounded-md"
                  draggable={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
