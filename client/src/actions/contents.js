import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    SET_CURRID,
} from "../constants/actions";
import * as api from "../api";

// the CRUD methods for redux reducers

export const getContents = () => async (dispatch) => {
    try {
        const { data } = await api.fetchContents();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const createContent = (content) => async (dispatch) => {
    try {
        const { data } = await api.createContent(content);
        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const updateContent = (id, content) => async (dispatch) => {
    try {
        const { data } = await api.updateContent(id, content);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const deleteContent = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteContent(id);
        dispatch({ type: DELETE, payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const setCurrID = (id) => async (dispatch) => {
    try {
        dispatch({ type: SET_CURRID, payload: id });
    } catch (err) {
        console.log(err);
    }
};
