import { combineReducers } from "redux";
import { setStatusSlice } from "./setStatusSlice";
import { todosSlice } from "./todosSlice";

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  status: setStatusSlice.reducer,
});

export default rootReducer;
