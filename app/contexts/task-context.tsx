import React, { createContext, useCallback, useEffect, useState } from 'react'
import { taskService } from '~/services/task'
import type { Task } from '~/types/task'

interface TaskContextType {
  tasks: Task[]
  isLoading: boolean
  error: Error | null
  addTask: (task: Omit<Task, 'id'>) => Promise<string>
  deleteTask: (id: string) => Promise<void>
  refreshTasks: () => Promise<void>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refreshTasks = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedTasks = await taskService.getAll()
      setTasks(fetchedTasks)
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Falha ao carregar tarefas')
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addTask = useCallback(
    async (taskData: Omit<Task, 'id'>): Promise<string> => {
      try {
        setError(null)
        const newTaskId = await taskService.add(taskData)
        await refreshTasks()
        return newTaskId
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Falha ao adicionar tarefa')
        setError(error)
        throw error
      }
    },
    [refreshTasks]
  )

  const deleteTask = useCallback(
    async (id: string): Promise<void> => {
      try {
        setError(null)
        await taskService.delete(id)
        await refreshTasks()
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to delete task')
        setError(error)
        throw error
      }
    },
    [refreshTasks]
  )

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks])

  const value = {
    tasks,
    isLoading,
    error,
    addTask,
    deleteTask,
    refreshTasks,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
