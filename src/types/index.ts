export interface ITodo {
  value: string;
  completed: boolean;
  createdAt: number;
}

export type UpdatedTodo = {
  value?: string,
  completed?: boolean;
}
