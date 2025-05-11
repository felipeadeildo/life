import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Task } from '~/types/task'

interface TaskDBSchema extends DBSchema {
  tasks: {
    key: string
    value: Task
  }
}

export class TaskService {
  private _db: Promise<IDBPDatabase<TaskDBSchema>> | null = null

  private get db() {
    if (!this._db) {
      if (typeof window === 'undefined' || !window.indexedDB) {
        throw new Error('IndexedDB is not available in this environment')
      }

      this._db = openDB<TaskDBSchema>('tasks', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('tasks')) {
            db.createObjectStore('tasks', { keyPath: 'id' })
          }
        },
      })
    }
    return this._db
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

  async update(id: string, task: Task): Promise<void> {
    const db = await this.db
    await db.put('tasks', { ...task, id })
  }
}
