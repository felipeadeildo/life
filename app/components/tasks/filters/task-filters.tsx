import { Search } from 'lucide-react'

import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Priority, TaskStatus } from '~/types/task'

interface TaskFiltersProps {
  status: TaskStatus | 'all'
  priority: Priority | 'all'
  search: string
  onStatusChange: (status: TaskStatus | 'all') => void
  onPriorityChange: (priority: Priority | 'all') => void
  onSearchChange: (search: string) => void
}

export function TaskFilters({
  status,
  priority,
  search,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tarefas..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          {Object.values(TaskStatus).map(status => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filtrar por prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as prioridades</SelectItem>
          {Object.values(Priority).map(priority => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
