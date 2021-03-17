import axios from "axios";

export function getUserRatings(id) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/rating/${id}`);
}

export function createRating(hangoutId, ratingData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/rating/${hangoutId}`,
    ratingData
  );
}

export function getCreatedRatings(id_rater, event_id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/ratings/filter?id_rater=${id_rater}&event_id=${event_id}`
  );
}
