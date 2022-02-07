import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./components/inicio";
import Admin from "./components/admin";
import Login from "./components/login";
import Menu from "./components/menu";
import UsersList from "./components/users-list";

function App() {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
