import { SET_CURRID } from "../constants/actions";
const currid = (currid = 0, action) => {
  switch (action.type) {
    case SET_CURRID:
      return action.payload;
    default:
      return currid;
  }
};

export default currid;
