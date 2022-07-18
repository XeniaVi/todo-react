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
  notCompletedCount: number;
  idsCompleted: Array<string>;
}

export interface IStatusState {
  completed?: boolean;
  completedAll: boolean;
  filter: string;
  offset: number;
  currentPage: number;
  errorMessage: string;
}

export type AuthState = {
  isRegistration: boolean;
  isLogin: boolean;
  message: string;
  registrationError: string;
  token: string | null;
}

export interface PostRegistration {
  username: string;
  password: string;
};

export interface PostLogin extends PostRegistration {}