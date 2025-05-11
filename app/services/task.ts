import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Task } from '~/types/task'

interface TaskDBSchema extends DBSchema {
  tasks: {
    key: string
    value: Task
  }
}

class TaskService {
  private db: Promise<IDBPDatabase<TaskDBSchema>>

  constructor() {
    this.db = openDB<TaskDBSchema>('tasks', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' })
        }
      },
    })
  }

  async add(task: Omit<Task, 'id'>): Promise<string> {
    const db = await this.db
    const id = crypto.randomUUID()
    await db.put('tasks', { ...task, id })
    return id
  }

  async getAll(): Promise<Task[]> {
    const db = await this.db
    return db.getAll('tasks')
  }

  async delete(id: string): Promise<void> {
    const db = await this.db
    await db.delete('tasks', id)
  }
}

export const taskService = new TaskService()
