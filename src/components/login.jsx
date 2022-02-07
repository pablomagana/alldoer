import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      () => {
        setError(null);
        navigate("/inicio");
      },
      (error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
          setError("El email no es valido");
        }
        if (error.code === "auth/weak-password") {
          setError("La contaseña debe tener al menos 6 caracteres");
        }
        if (error.code === "auth/email-already-in-use") {
          setError("Ya existe un usuario con ese email");
        }
      }
    );
  };

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setError(null);
        console.log("Usuario logeado,", user);
        navigate("/inicio");
      })
      .catch((error) => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setError("El email o contaseña invalidos");
        }
      });
  };
  return (
    <div>
      <div className="d-flex mt-5 justify-content-center">
        <div className="w-75">
          <form className="text-center">
            <input
              className="form-control"
              type="email"
              placeholder="email"
              autoComplete="no"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control mt-4"
              type="password"
              placeholder="pasword"
              autoComplete="no"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4 text-black-50">{error}</div>
          </form>
          <button
            type="button"
            className="btn btn-dark btn-lg btn-block w-100 mt-4"
            onClick={(e) => registerUser(e)}
          >
            Registrar
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg btn-block w-100 mt-4"
            onClick={(e) => loginUser(e)}
          >
            Iniciar sessión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
