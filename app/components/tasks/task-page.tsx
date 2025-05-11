import { useState } from 'react'

import { useTasks } from '~/hooks/use-tasks'
import { Priority, TaskStatus } from '~/types/task'
import { TaskBoard } from './board/task-board'
import { TaskDialog } from './dialogs/task-dialog'
import { TaskFilters } from './filters/task-filters'

export function TaskPage() {
  const { error } = useTasks()
  const [filters, setFilters] = useState({
    status: 'all' as TaskStatus | 'all',
    priority: 'all' as Priority | 'all',
    search: '',
  })

  if (error?.message.includes('not available')) {
    return (
      <div className="container space-y-4 p-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Tarefas</h1>
        </header>

        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          <p className="font-medium">
            O serviço de tarefas não está disponível.
          </p>
          <p className="mt-1 text-sm">
            Isso pode acontecer se você estiver usando um navegador que não
            suporta IndexedDB ou se o acesso ao armazenamento local estiver
            bloqueado.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container space-y-4 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tarefas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas tarefas usando o quadro Kanban
          </p>
        </div>
        <TaskDialog />
      </header>

      <TaskFilters
        {...filters}
        onStatusChange={status => setFilters(f => ({ ...f, status }))}
        onPriorityChange={priority => setFilters(f => ({ ...f, priority }))}
        onSearchChange={search => setFilters(f => ({ ...f, search }))}
      />

      <div className="h-[calc(100vh-12rem)]">
        <TaskBoard
          filterStatus={filters.status}
          filterPriority={filters.priority}
          searchQuery={filters.search}
        />
      </div>
    </div>
  )
}
