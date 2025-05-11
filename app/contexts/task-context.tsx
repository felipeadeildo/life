import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TaskService } from '~/services/task'
import type { Task } from '~/types/task'

interface TaskContextType {
  tasks: Task[]
  isLoading: boolean
  error: Error | null
  addTask: (task: Omit<Task, 'id'>) => Promise<string>
  deleteTask: (id: string) => Promise<void>
  updateTask: (id: string, task: Task) => Promise<void>
  refreshTasks: () => Promise<void>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const taskService = useMemo(() => new TaskService(), [])

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
  }, [taskService])

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
    [refreshTasks, taskService]
  )

  const deleteTask = useCallback(
    async (id: string): Promise<void> => {
      try {
        setError(null)
        await taskService.delete(id)
        await refreshTasks()
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Falha ao deletar tarefa')
        setError(error)
        throw error
      }
    },
    [refreshTasks, taskService]
  )

  const updateTask = useCallback(
    async (id: string, taskData: Task): Promise<void> => {
      try {
        setError(null)
        await taskService.update(id, taskData)
        await refreshTasks()
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Falha ao atualizar tarefa')
        setError(error)
        throw error
      }
    },
    [refreshTasks, taskService]
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
    updateTask,
    refreshTasks,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
