import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { useTasks } from '~/hooks/use-tasks'
import { Priority, TaskStatus } from '~/types/task'
import { TaskCard } from '../cards/task-card'
import { TaskColumn } from './task-column'

interface TaskBoardProps {
  filterStatus: TaskStatus | 'all'
  filterPriority: Priority | 'all'
  searchQuery: string
}

export function TaskBoard({
  filterStatus,
  filterPriority,
  searchQuery,
}: TaskBoardProps) {
  const { tasks, updateTask } = useTasks()

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesPriority =
      filterPriority === 'all' ||
      task.importance === filterPriority ||
      task.urgency === filterPriority ||
      task.complexity === filterPriority
    const matchesSearch = searchQuery
      ? task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    return matchesStatus && matchesPriority && matchesSearch
  })

  const todoTasks = filteredTasks.filter(
    task => task.status === TaskStatus.TODO
  )
  const inProgressTasks = filteredTasks.filter(
    task => task.status === TaskStatus.IN_PROGRESS
  )
  const doneTasks = filteredTasks.filter(
    task => task.status === TaskStatus.DONE
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find(task => task.id === active.id)
    if (!activeTask) return

    const status = over.id as TaskStatus
    if (activeTask.status !== status) {
      await updateTask(activeTask.id, {
        ...activeTask,
        status,
        updatedAt: new Date(),
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
        <TaskColumn id={TaskStatus.TODO} title="A Fazer" tasks={todoTasks}>
          {todoTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>

        <TaskColumn
          id={TaskStatus.IN_PROGRESS}
          title="Em Progresso"
          tasks={inProgressTasks}
        >
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>

        <TaskColumn id={TaskStatus.DONE} title="Concluído" tasks={doneTasks}>
          {doneTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>
      </div>
    </DndContext>
  )
}
