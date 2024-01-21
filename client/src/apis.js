import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const login = (payload) => api.post("/user/login", payload);

export const createClass = (payload) => api.post("/class/create", payload);

export const getClasses = (payload) => api.post("/class/day", payload);

const apis = {
  login,
  createClass,
  getClasses,
};

export default apis;
