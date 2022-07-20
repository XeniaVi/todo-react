import { combineReducers } from "redux";
import { setStatusSlice } from "./setStatusSlice";
import { todosSlice } from "./todosSlice";
import { registrationSlice } from "./authSlice";

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  status: setStatusSlice.reducer,
  auth: registrationSlice.reducer,
});

export default rootReducer;
