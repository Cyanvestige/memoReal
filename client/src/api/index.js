import axios from "axios";

// use axios to connect client side withs server side
const API = axios.create({
  baseURL: "https://memoreal-server.herokuapp.com",
});

// use interceptors to keep the login state for the user by trying to get the "profile" from the local storage
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // learn more about Bearer: https://swagger.io/docs/specification/authentication/bearer-authentication/
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// define all CRUD methods on the client side interacting with the server side
export const fetchContents = () => API.get("/contents");
export const createContent = (newContent) => API.post("/contents", newContent);
export const updateContent = (id, content) =>
  API.patch(`/contents/${id}`, content);
export const deleteContent = (id) => API.delete(`/contents/${id}`);

export const logIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
