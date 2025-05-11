import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'

import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { Task } from '~/types/task'

interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
  children: ReactNode
}

export function TaskColumn({ id, title, tasks, children }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-none p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Badge variant="secondary" className="font-normal">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2">
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div ref={setNodeRef} className="space-y-2 p-2">
            <SortableContext
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {children}
            </SortableContext>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
