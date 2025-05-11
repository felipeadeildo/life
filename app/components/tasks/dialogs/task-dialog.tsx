import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { useTasks } from '~/hooks/use-tasks'
import type { Task } from '~/types/task'
import type { TaskFormValues } from '../forms/task-form'
import { TaskForm } from '../forms/task-form'

interface TaskDialogProps {
  task?: Task
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TaskDialog({
  task,
  trigger,
  open,
  onOpenChange,
}: TaskDialogProps) {
  const { addTask, updateTask } = useTasks()
  const handleSubmit = async (values: TaskFormValues) => {
    if (task) {
      await updateTask(task.id, {
        ...task,
        ...values,
        updatedAt: new Date(),
      })
    } else {
      const now = new Date()
      await addTask({
        ...values,
        createdAt: now,
        updatedAt: now,
        isDelayed: false,
        weekNumber: 1, // TODO: calcular isso baseado na primeira task definida ou configuração
        year: now.getFullYear(),
        totalTimeSpent: 0,
        timeEntries: [],
      })
    }
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {task ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={task}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
