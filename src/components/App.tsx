import React from "react";
import { Routes, Route } from "react-router-dom";
import Todos from "./Todos";
import Login from "./Login";
import Registration from "./Registration";
import Main from "./Main";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default App;
