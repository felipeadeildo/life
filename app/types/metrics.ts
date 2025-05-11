export interface WeeklyMetrics {
  weekNumber: number
  year: number
  weight?: number // em kg
  tasksCompleted: number
  tasksTotal: number
  studyHours: number
  exerciseMinutes: number
  sleepAverage: number // em horas
  totalPoints: number
}
