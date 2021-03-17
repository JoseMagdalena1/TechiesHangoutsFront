import axios from "axios";

const storedUser = JSON.parse(localStorage.getItem("currentUser"));

let token = (storedUser && storedUser.token) || null;

axios.interceptors.request.use(
  function(config) {
    if (
      token &&
      !(config.url.includes("/auth") || config.url.includes("/users"))
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    if (response.data.token) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      token = response.data.token;
    }
    return response;
  },
  function(error) {
    /**
     * Tengo que añadir /rating para poder permitir a usuarios anónimos
     * abrir principal.
     */
    if (
      error.response.status === 401 &&
      !error.config.url.includes("/auth") &&
      !error.config.url.includes("/rating") &&
      !error.config.url.includes("/attendance")
    ) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export function register(email, password) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
    email,
    password
  });
}

export function deleteUser(userData, id) {
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
    userData
  );
}

export function login(userData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, userData);
}

export function getUser(userData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/get`, userData);
}
