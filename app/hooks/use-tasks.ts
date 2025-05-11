import { useContext } from 'react'
import { TaskContext } from '~/contexts/task-context'
import type { Task } from '~/types/task'

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks precisa ser usado dentro de um TaskProvider')
  }
  return context
}

export function useTask(id: string): Task | undefined {
  const { tasks } = useTasks()
  return tasks.find(task => task.id === id)
}

export function useFilteredTasks(predicate: (task: Task) => boolean): Task[] {
  const { tasks } = useTasks()
  return tasks.filter(predicate)
}
