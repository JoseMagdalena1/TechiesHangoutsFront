import React, { useState, useEffect } from "react";
import {
  getHangoutAttendance,
  checkInToHangout,
  getAllUserAttendance
} from "../http/attendanceService";
import { useHistory } from "react-router-dom";
import { isAlreadyAnnotated } from "../http/usefulFunctions";
import { useAuth } from "../context/auth-context";

export function LogicButton({ hangoutId, organizatorId }) {
  const history = useHistory();
  console.log(hangoutId);
  const { currentUser } = useAuth();
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getHangoutAttendance(hangoutId).then(response =>
      setAttendance(response.data)
    );
  }, []);

  const handleClick = () => {
    checkInToHangout(hangoutId)
      .then(() => {
        history.push(`/hangout/${hangoutId}`);
        window.location.reload();
      })
      .catch(() => {
        history.push(`/hangout/${hangoutId}`);
      });
  };

  const isLogged = currentUser !== null ? true : false;

  const handleNotLoggedClick = () => {
    history.push(`/login?id=${hangoutId}`);
  };

  if (!isLogged) {
    return (
      <button className="btn" onClick={handleNotLoggedClick} id="editar">
        Quiero ir!
      </button>
    );
  } else {
    const alreadyCheckedIn =
      false || isAlreadyAnnotated(currentUser.userId, attendance);

    const isUserAdmin = currentUser.userId === organizatorId ? true : false;

    return (
      <React.Fragment>
        {(isUserAdmin && (
          <button
            className="ghost"
            onClick={() => history.push(`/edit/hangout/${hangoutId}`)}
            id="editar"
          >
            Editar quedada
          </button>
        )) ||
          (!isUserAdmin &&
            ((alreadyCheckedIn && (
              <span className="btn" id="alertaInscrito">
                Ya estás inscrito
              </span>
            )) ||
              (!alreadyCheckedIn && (
                <button className="btn" onClick={handleClick}>
                  Quiero ir!
                </button>
              ))))}
      </React.Fragment>
    );
  }
}
