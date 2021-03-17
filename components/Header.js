import React from "react";
import logo from "../img/logo.jpeg";
import cerrarSesion from "../img/cerrar-sesion.svg";
import { useHistory } from "react-router-dom";

export function Header({ title }) {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const history = useHistory();

  function handleClick() {
    if (storedUser === null) {
      return history.push("/login");
    } else {
      console.log(storedUser.userId);
      return history.push(`/profile/${storedUser.userId}`);
    }
  }

  {
    /*const usuario = () => {
    if (storedUser === null) {
      return "Amigo";
    } else {
      return storedUser.email;
    }
  };*/
  }

  return (
    <React.Fragment>
      <header id="header">
        <a href="/principal">
          <img id="logo" alt="Home-figure" src={logo} />
        </a>
        <a href="/principal">
          <h1>{title}</h1>
        </a>

        <ul>
          <li onClick={handleClick} className="hola">
            Hola amigo!
          </li>

          <li className="logout">
            <img
              onClick={() => {
                localStorage.removeItem("currentUser");
                window.location.href = "/";
              }}
              src={cerrarSesion}
              alt="salir"
            />
          </li>
        </ul>
      </header>
    </React.Fragment>
  );
}
