export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export enum ExpenseCategory {
  FOOD = 'Alimentação',
  TRANSPORT = 'Transporte',
  HOUSING = 'Moradia',
  ENTERTAINMENT = 'Entretenimento',
  EDUCATION = 'Educação',
  HEALTH = 'Saúde',
  CLOTHING = 'Vestuário',
  OTHER = 'Outros',
}
