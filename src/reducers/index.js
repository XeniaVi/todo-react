import { combineReducers } from "redux";
import { updateTodos } from "./updateTodos";

const rootReducer = combineReducers({
  todos: updateTodos,
});

export default rootReducer;
