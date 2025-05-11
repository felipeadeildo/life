export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  time: Date;
  category: MealCategory;
}

export enum MealCategory {
  BREAKFAST = 'Café da Manhã',
  LUNCH = 'Almoço',
  DINNER = 'Jantar',
  SNACK = 'Lanche',
}
