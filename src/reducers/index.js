import { combineReducers } from "redux";
import { setStatusReducer } from "./setStatusReducer";
import { TodoReducer } from "./TodoReducer";

const rootReducer = combineReducers({
  todos: TodoReducer,
  status: setStatusReducer,
});

export default rootReducer;
