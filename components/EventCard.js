import React, { useState, useEffect } from "react";
import { MiniCardHangout } from "../components/MiniCardHangout";
import { MiniCardHangoutRating } from "./MiniCardHangoutRating";
import { getAcceptedAttendance } from "../http/attendanceService";
import { useHistory } from "react-router-dom";

export function EventCard({ event, votar }) {
  const [asistentes, setAsistentes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAcceptedAttendance(event.id)
      .then(response => setAsistentes(response.data))
      .catch(error => console.log(error));
  }, []);

  const date = event.event_date.substring(0, 10);

  return (
    <div className="eventCard">
      <div
        onClick={() => history.push(`/hangout/${event.id}`)}
        id="hangout-img"
        style={{ backgroundImage: "url(" + event.photo_url + ")" }}
      ></div>
      <ul
        onClick={() => history.push(`/hangout/${event.id}`)}
        id="eventCard-info"
      >
        <li>{date}</li>
        <li>{event.title}</li>
        <li>{event.cityName}</li>
      </ul>

      <h5>Asistentes:</h5>
      <ul id="eventCard-attendants">
        {asistentes.map(asistente => (
          <li>
            {(votar && (
              <MiniCardHangoutRating eventId={event.id} user={asistente} />
            )) ||
              (!votar && <MiniCardHangout user={asistente} />)}
          </li>
        ))}
      </ul>
    </div>
  );
}
