import { combineReducers } from "redux";

import contents from "./contents";
import currid from "./currid";
import auth from "./auth";

export default combineReducers({ contents, currid, auth });
