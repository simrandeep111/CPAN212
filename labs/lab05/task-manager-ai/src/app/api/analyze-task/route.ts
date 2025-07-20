import { NextRequest, NextResponse } from 'next/server'

interface AnalyzeTaskRequest {
  title: string
  description: string
}

interface AnalyzeTaskResponse {
  suggestions: string
  estimatedTime: string
  confidence: number
}

export async function POST(request: NextRequest) {
  try {
    const { title, description }: AnalyzeTaskRequest = await request.json()

    const suggestions = generateTaskSuggestions(title, description)
    const estimatedTime = estimateTaskTime(title, description)
    
    const response: AnalyzeTaskResponse = {
      suggestions,
      estimatedTime,
      confidence: 0.75
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error analyzing task:', error)
    return NextResponse.json(
      { error: 'Failed to analyze task' },
      { status: 500 }
    )
  }
}

function generateTaskSuggestions(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  
  // Simple keyword-based suggestions
  if (text.includes('meeting') || text.includes('call') || text.includes('interview')) {
    return "Consider scheduling this in advance and preparing an agenda. Set a reminder 15 minutes before."
  }
  
  if (text.includes('email') || text.includes('message') || text.includes('respond')) {
    return "Batch process emails for efficiency. Consider setting specific times for email management."
  }
  
  if (text.includes('study') || text.includes('learn') || text.includes('research')) {
    return "Break this into smaller learning sessions. Use active recall and spaced repetition for better retention."
  }
  
  if (text.includes('exercise') || text.includes('workout') || text.includes('gym')) {
    return "Schedule this at consistent times to build a habit. Track your progress for motivation."
  }
  
  if (text.includes('urgent') || text.includes('asap') || text.includes('immediately')) {
    return "This appears urgent. Consider if it can be delegated or if the deadline can be clarified."
  }
  
  return "Break this task into smaller steps if it feels overwhelming. Set a specific time to work on it."
}

function estimateTaskTime(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  const wordCount = text.split(' ').length
  
  // Simple time estimation based on keywords and length
  if (text.includes('quick') || text.includes('brief') || wordCount < 5) {
    return "15-30 minutes"
  }
  
  if (text.includes('research') || text.includes('analysis') || text.includes('report')) {
    return "2-4 hours"
  }
  
  if (text.includes('project') || text.includes('develop') || text.includes('create')) {
    return "4-8 hours"
  }
  
  if (text.includes('meeting') || text.includes('call')) {
    return "30-60 minutes"
  }
  
  return "1-2 hours"
}
