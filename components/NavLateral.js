import React from "react";
import iconSignin from "../img/signin.svg";
import iconStar from "../img/star.svg";
import iconEvent from "../img/event.svg";
import iconNotifications from "../img/notifications.svg";
import iconRrss from "../img/rrss.svg";
import iconSettings from "../img/settings.svg";
import iconContact from "../img/contact.svg";

export function NavLateral() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  let id;
  if (storedUser === null) {
    id = undefined;
  } else {
    id = storedUser.userId;
  }

  return (
    <section className="barra">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/myhangouts">
                <span className="">
                  <img src={iconEvent} />
                  TUS EVENTOS
                </span>
              </a>
            </li>
            <li>
              <a href={`/profile/${id}`}>
                <span className="">
                  <img src={iconSignin} />
                  PERFIL
                </span>
              </a>
              <li>
                <a href="/notifications">
                  <span className="">
                    <img src={iconNotifications} />
                    NOTIFICACIONES
                  </span>
                </a>
              </li>
            </li>
            <li>
              <a href="/myhangouts">
                <span className="">
                  <img src={iconStar} />
                  PUNTUACIONES
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="">
                  <img src={iconRrss} />
                  ENLACES A REDES SOCIALES
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="">
                  <img src={iconSettings} />
                  OPCIONES
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="botonCrear">
          <button
            className="btn"
            onClick={() => (window.location.href = "/create/hangout")}
          >
            CREAR EVENTO
          </button>
        </div>
      </aside>
    </section>
  );
}
