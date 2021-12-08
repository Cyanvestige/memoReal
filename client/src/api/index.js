import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
});

export const fetchContents = () => API.get("/contents");
export const createContent = (newContent) => API.post("/contents", newContent);
export const updateContent = (id, content) =>
    API.patch(`/contents/${id}`, content);
export const deleteContent = (id) => API.delete(`/contents/${id}`);

export const logIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
