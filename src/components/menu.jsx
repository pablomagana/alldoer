import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

const Menu = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });
  }, []);

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              {!user ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                <div></div>
              )}
            </li>
            <li className="nav-item">
              {!user ? (
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              ) : (
                <div></div>
              )}
            </li>
          </ul>
          {user ? (
            <button className="btn btn-danger" onClick={logout}>
              Cerrar sesion
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Menu;
