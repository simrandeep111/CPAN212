'use client'

import { useState } from 'react'
import { 
  Check, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  AlertCircle,
  Brain,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import TaskForm from './TaskForm'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const priorityColors: Record<Task['priority'], string> = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200'
  }

  const categoryColors: Record<Task['category'], string> = {
    personal: 'bg-blue-100 text-blue-800',
    work: 'bg-purple-100 text-purple-800',
    study: 'bg-indigo-100 text-indigo-800',
    health: 'bg-pink-100 text-pink-800',
    shopping: 'bg-teal-100 text-teal-800',
    other: 'bg-gray-100 text-gray-800'
  }

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed })
  }

  const handleEdit = (updatedData: any) => {
    onUpdate(task.id, updatedData)
    setIsEditing(false)
  }

  const formatDate = (dateString: string): string | null => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const isOverdue = (dueDate: string): boolean => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date() && !task.completed
  }

  if (isEditing) {
    return <TaskForm initialData={task} onSubmit={handleEdit} onCancel={() => setIsEditing(false)} />
  }

  return (
    <div className={`card transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Completion Checkbox */}
        <button
          onClick={handleToggleComplete}
          className={`mt-1 p-1 rounded-full transition-colors ${
            task.completed 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
          }`}
        >
          <Check className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          {/* Task Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                  {task.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                  {task.category}
                </span>
                {task.dueDate && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    isOverdue(task.dueDate) 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Calendar className="h-3 w-3" />
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate) && <AlertCircle className="h-3 w-3" />}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Toggle details"
              >
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                title="Edit task"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {task.description && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-600">{task.description}</p>
                </div>
              )}

              {/* AI Suggestions */}
              {task.aiSuggestions && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    AI Insights
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">{task.aiSuggestions}</p>
                    {task.estimatedTime && (
                      <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Estimated time: {task.estimatedTime}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}