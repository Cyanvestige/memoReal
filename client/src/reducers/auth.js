import { AUTH, LOGOUT } from "../constants/actions";

// the reducer for authentication has an object with a key "authData" initialized as a null.
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        // if the action is AUTH type we will put the action data(authentication information) to localStorate to indicate the "Logged in" state
        case AUTH:
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
