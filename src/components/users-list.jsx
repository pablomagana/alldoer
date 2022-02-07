import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { store } from "../firebase.config";
function UsersList() {
  const [error, setError] = useState(null);
  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { docs } = await getDocs(collection(store, "users"));
      setUsers(
        docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    };

    getUsers().catch(console.error);
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    e.preventDefault();
    if (!phone.trim()) {
      setError("Phone is required");
      return;
    }
    setError(null);

    try {
      const doc = await addDoc(collection(store, "users"), {
        name: name,
        phone: phone,
      });
      setUsers([...users, { id: doc.id, name, phone }]);
      setName("");
      setPhone("");
    } catch (e) {
      setError(e.message);
    }
  };

  const removeUser = async (e, id) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(store, "users", id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const prepareUpdate = (user) => {
    setError("");
    setIdUser(user.id);
    setName(user.name);
    setPhone(user.phone);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(store, "users", idUser), {
        name: name,
        phone: phone,
      });
      setUsers(
        users.map((user) =>
          user.id === idUser ? { id: idUser, name, phone } : user
        )
      );
      setName("");
      setPhone("");
      setIdUser("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Nuevo Usuario</h2>
          <form className="form-group">
            <input type="hidden" value={idUser} />
            <input
              value={name}
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={phone}
              type="text"
              className="form-control mt-3"
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
            {idUser?.length === 0 ? (
              <input
                type="submit"
                value="Registrar"
                className="btn btn-dark btn-block mt-3"
                onClick={(e) => saveUser(e)}
              />
            ) : (
              <input
                type="submit"
                value="Actualizar"
                className="btn btn-dark btn-block mt-3"
                onClick={(e) => updateUser(e)}
              />
            )}
          </form>
        </div>
        <div className="col">
          <h2>Lista de Usuarios</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-group-item list-inline text-center d-flex justify-content-between align-items-center"
              >
                <div onClick={() => prepareUpdate(user)}>
                  {user.name} - {user.phone}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={(e) => removeUser(e, user.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
