import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actions";
export default (contents = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...contents, action.payload];
        case UPDATE:
            return contents;
        case DELETE:
            return contents.filter(
                (content) => content._id !== action.payload._id
            );
        default:
            return contents;
    }
};
