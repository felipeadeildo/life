export interface Exercise {
  id: string
  type: ExerciseType
  date: Date
  duration: number // Em minutos
  caloriesBurned?: number
  notes?: string
}

export enum ExerciseType {
  RUNNING = 'Corrida',
  GYM = 'Academia',
  SWIMMING = 'Natação',
  CYCLING = 'Ciclismo',
  WALKING = 'Caminhada',
  OTHER = 'Outros',
}

export interface RunningExercise extends Exercise {
  type: ExerciseType.RUNNING
  distance: number // Em km
  averagePace: number // Minutos por km
  runningType: RunningType
}

export enum RunningType {
  STEADY = 'Constante',
  INTERVAL = 'Intervalado',
  LONG = 'Longa Distância',
  RECOVERY = 'Recuperação',
}

export interface GymExercise extends Exercise {
  type: ExerciseType.GYM
  workout: string
  sets?: number
  reps?: number
  weight?: number
}
