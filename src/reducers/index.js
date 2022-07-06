import { combineReducers } from "redux";
import { setStatus } from "./setStatus";
import { updateTodos } from "./updateTodos";

const rootReducer = combineReducers({
  todos: updateTodos,
  status: setStatus,
});

export default rootReducer;
