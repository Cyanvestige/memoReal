import { AUTH } from "../constants/actions";
import * as api from "../api/index";

export const login = (formData, history) => async (dispatch) => {
    try {
        //log in
        const { data } = await api.logIn(formData);
        dispatch({ type: AUTH, data });
        history.push("/");
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        //sign up
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push("/");
    } catch (err) {
        console.log(err);
        return err;
    }
};
