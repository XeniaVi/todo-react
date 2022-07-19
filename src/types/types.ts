export type UpdatedTodo = {
  value?: string;
  completed?: boolean;
};

export type UpdatedTodoID = {
  id: string;
  updatedTodo: UpdatedTodo;
};

export type AuthState = {
  isRegistration: boolean;
  isLogin: boolean;
  message: string;
  registrationError: string;
  token: string | null;
}
