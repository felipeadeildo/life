export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  importance: Priority;
  urgency: Priority;
  complexity: Priority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  isDelayed: boolean;
  weekNumber: number; // associado à semana desde a primeira entrada.
  year: number;
  totalTimeSpent: number; // em milissegundos
  timeEntries: TimeEntry[];
}

export enum TaskStatus {
  TODO = 'A Fazer',
  IN_PROGRESS = 'Em Progresso',
  DONE = 'Concluído',
}

export enum Priority {
  LOW = 'Baixa',
  MEDIUM = 'Média',
  HIGH = 'Alta',
}

export interface TimeEntry {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // em milisegundos
  isActive: boolean;
}
