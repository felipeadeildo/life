import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Clock, Grip } from 'lucide-react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '~/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { cn } from '~/lib/utils'
import type { Task } from '~/types/task'

interface TaskCardProps {
  task: Task
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-destructive/20 text-destructive hover:bg-destructive/30'
      case 'Média':
        return 'bg-warning/20 text-warning hover:bg-warning/30'
      case 'Baixa':
        return 'bg-muted text-muted-foreground hover:bg-muted/80'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative hover:shadow-md transition-shadow',
        {
          'opacity-50 shadow-md': isDragging,
        },
        className
      )}
    >
      <CardHeader className="p-3 pb-0">
        <div
          {...attributes}
          {...listeners}
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
        >
          <Grip className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardTitle className="text-sm font-medium leading-none tracking-tight">
          {task.title}
        </CardTitle>
        <CardDescription className="mt-2 text-xs">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <div className="flex gap-1 text-xs">
          <Badge
            variant="secondary"
            className={getPriorityColor(task.importance)}
          >
            Imp: {task.importance}
          </Badge>
          <Badge variant="secondary" className={getPriorityColor(task.urgency)}>
            Urg: {task.urgency}
          </Badge>
        </div>
        {task.totalTimeSpent > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {formatDistanceToNow(task.totalTimeSpent, {
                locale: ptBR,
                addSuffix: false,
              })}
            </span>
          </div>
        )}
        {task.dueDate && (
          <div className="mt-1 text-xs text-muted-foreground">
            Prazo:{' '}
            {formatDistanceToNow(task.dueDate, {
              locale: ptBR,
              addSuffix: true,
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
