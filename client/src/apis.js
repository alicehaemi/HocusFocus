import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:8080"
});

export const login = payload => api.post("/user/login", payload);

const apis = {
    login,
}

export default apis;