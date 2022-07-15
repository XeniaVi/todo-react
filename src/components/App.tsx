import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom"
import Todos from "./Todos";
import Login from './Login';
import Registration from './Registration'
import Main from "./Main";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todos" element={<Todos />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
    </Routes>
  );
};

export default App;
