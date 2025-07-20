'use client'

import { useState, useEffect } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { PlusCircle, Brain, CheckCircle2 } from 'lucide-react'
import type { Task, TaskFormData, TaskStats, FilterType } from '../types'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const [stats, setStats] = useState<TaskStats>({ total: 0, completed: 0, pending: 0 })

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks)
        setTasks(parsedTasks)
        updateStats(parsedTasks)
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    updateStats(tasks)
  }, [tasks])

  const updateStats = (taskList: Task[]) => {
    const total = taskList.length
    const completed = taskList.filter(task => task.completed).length
    const pending = total - completed
    setStats({ total, completed, pending })
  }

  const addTask = async (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    // Try to get AI suggestion for priority
    try {
      const response = await fetch('/api/analyze-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskData.title, description: taskData.description })
      })
      
      if (response.ok) {
        const analysis = await response.json()
        newTask.aiSuggestions = analysis.suggestions
        newTask.estimatedTime = analysis.estimatedTime
      }
    } catch (error) {
      console.log('AI analysis not available:', error)
    }

    setTasks(prev => [newTask, ...prev])
    setShowForm(false)
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Task Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks with intelligent priority suggestions
          </p>
        </header>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-500">Total Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-gray-500">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-gray-500">Pending</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>

          <div className="flex gap-2">
            {(['all', 'pending', 'completed'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8">
            <TaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              {filter === 'completed' ? 'No completed tasks yet' :
               filter === 'pending' ? 'No pending tasks' : 'No tasks yet'}
            </h3>
            <p className="text-gray-400">
              {filter === 'all' ? 'Add your first task to get started!' : 
               `Switch to "all" to see your ${filter === 'completed' ? 'pending' : 'completed'} tasks`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
