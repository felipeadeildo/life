export interface Sleep {
  id: string
  date: Date
  sleepTime: Date
  wakeTime: Date
  duration?: number // em minutos
  quality?: number // 1-10
  notes?: string
}
