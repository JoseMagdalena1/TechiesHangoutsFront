import axios from "axios";

export function checkInToHangout(hangoutId) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/${hangoutId}`
  );
}

export function acceptAttendance(hangoutId, guest_id, email, hangout) {
  console.log(guest_id);
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/accepted/${hangoutId}`,
    { guest_id, email, hangout }
  );
}

export function rejectAttendance(hangoutId, guest_id) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/rejected/${hangoutId}`,
    { guest_id}
  );
}

export function getAcceptedAttendance(hangoutId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/accepted/${hangoutId}`
  );
}

export function getPendingAttendance(hangoutId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/pending/${hangoutId}`
  );
}
/**
 *
 * @param {*} userId
 * Devuelve todos los eventos a los que se ha anotado el usuario, exceptuando las rechazadas
 */
export function getAllUserAttendance(userId) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/attendance/${userId}`);
}

/**
 *
 * @param {*} hangoutId
 * @return Todas las peticiones de asistir a este evento
 */
export function getHangoutAttendance(hangoutId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/attendance/hangout/${hangoutId}`
  );
}
