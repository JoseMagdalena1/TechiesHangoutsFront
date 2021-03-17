import axios from "axios";

export function getAllCities() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/allcities`);
}

export function getAllThematics() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/allthematics`);
}

export function getCityName(city_id) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/city/${city_id}`);
}

export function getThematicName(thematic_id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/thematic/${thematic_id}`
  );
}
