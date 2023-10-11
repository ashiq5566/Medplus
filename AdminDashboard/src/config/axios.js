import axios from "axios";

const URL = "http://127.0.0.1:8000/api/v1"; // demo url

const ruppellsConfig = axios.create({
    baseURL: URL,
});

const ruppellsAuthConfig = axios.create({
    baseURL: URL,
});

ruppellsAuthConfig.interceptors.request.use(
    (request) => {
        const state = JSON.parse(localStorage.getItem("auth")).state;
        const access = state.accessToken;

        request.headers.Authorization = `Bearer ${access}`;

        return request;
    },
    (error) => {
        return error;
    }
);

export default ruppellsConfig;
export { ruppellsAuthConfig };
