export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'personal' | 'work' | 'study' | 'health' | 'shopping' | 'other'
  dueDate: string
  completed: boolean
  createdAt: string
  aiSuggestions?: string
  estimatedTime?: string
}

export interface TaskFormData {
  title: string
  description: string
  priority: Task['priority']
  category: Task['category']
  dueDate: string
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
}

export type FilterType = 'all' | 'pending' | 'completed'
