import React from "react";

import { useSpring, animated } from "react-spring";
import { AsistenteQuedada } from "./AsistenteQuedada";
import { useHistory } from "react-router-dom";
import { LogicButton } from "./LogicButton";
import {
  checkInToHangout,
  getHangoutAttendance
} from "../http/attendanceService";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.02
];
const trans = (x, y, s) => `scale(${s})`;

export function HangoutCards({ event }) {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const history = useHistory();

  const date = event.event_date.split("T");
  const hour = event.event_hour.substring(0, 5);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 250, friction: 40 }
  }));

  const handleClick = () => {
    if (storedUser !== null) {
      return checkInToHangout(event.id)
        .then(() => {
          getHangoutAttendance(event.id)
            .then(history.push(`/hangout/${event.id}`))
            .catch(err => console.error(err));
        })
        .catch(() => {
          history.push(`/hangout/${event.id}`);
        });
    } else {
      history.push(`/login?id=${event.id}`);
    }
  };
  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={function() {
        set({ xys: [0, 0, 1] });
      }}
      className="card"
      style={{
        transform: props.xys.interpolate(trans)
      }}
    >
      <div
        id="hangout-img"
        style={{ backgroundImage: "url(" + event.photo_url + ")" }}
        onClick={() => history.push(`/hangout/${event.id}`)}
      ></div>
      <div id="hangout-info">
        <h3>{event.title}</h3>
        <div>
          <h5>{event.cityName}</h5>
          <h5>
            {date[0]} {hour}
          </h5>
          <h5>{event.thematicName}</h5>
        </div>
        <LogicButton hangoutId={event.id} organizatorId={event.user_id} />

        <div id="event-organizator">
          <AsistenteQuedada event={event} />
        </div>
      </div>
    </animated.div>
  );
}
