import axios from "axios";

export function getProfile(id) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/profiles/${id}`);
}

export function updateProfile(userId, profileData) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/profiles/${userId}`,
    profileData
  );
}

export function getAvatar(id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/profiles/avatar/${id}`
  );
}

export function updateAvatar({ id, avatar }) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/profiles/avatar/${id}`,
    avatar
  );
}

// #################################### CREATE PROFILE ##########################################

/**
 * Cargar Select de selecciona la universidad en la que has estudiado
 */

export function getColleges() {
  return fetch(
    `https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Universidades/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,Texto&returnGeometry=false&outSR=4326&f=json`
  );
}
