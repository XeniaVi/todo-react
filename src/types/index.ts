export interface ITodo {
  value: string;
  completed: boolean;
  createdAt: number;
}

export interface ITodoGet extends ITodo {
  id: string;
}

export type UpdatedTodo = {
  value?: string;
  completed?: boolean;
};

export type UpdatedTodoID = {
  id: string;
  updatedTodo: UpdatedTodo;
};

export interface ITodosState {
  todos: ITodoGet[];
  totalCount: number;
  pagesCount: number;
}

export interface IStatusState {
  completed?: boolean;
  completedAll: boolean;
  filter: string;
  offset: number;
  currentPage: number;
  count: number;
  errorMessage: string;
}
