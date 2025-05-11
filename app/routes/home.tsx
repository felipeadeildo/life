import { TaskPage } from '~/components/tasks/task-page'
import type { Route } from './+types/home'

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Life Tracking - Dashboard' },
    {
      name: 'description',
      content: 'Welcome to Life Tracking',
    },
  ]
}

export default function Home() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie suas tarefas usando o quadro Kanban abaixo. Mais
          funcionalidades serão adicionadas em breve.
        </p>
      </div>

      <div className="space-y-4">
        <TaskPage />
      </div>
    </>
  )
}
