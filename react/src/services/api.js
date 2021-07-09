import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/",
});

export const getAPI = (url, params = {}) => {
    return instance.get(url, params);
};

export const postAPI = (url, data) => {
    return instance.post(url, data);
};
