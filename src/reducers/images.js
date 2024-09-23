import {
    CREATE_IMAGE,
    GET_IMAGE,
    DELETE_IMAGE
} from "../actions/types";

// Initial state
const initialState = [];

// Customer Reducer
function imageReducer(images = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_IMAGE:
            return [...images, payload];

        case GET_IMAGE:
            return payload;

        case DELETE_IMAGE:
            return images.filter(({ id }) => id !== payload.id);

        default:
            return images;
    }
}

export default imageReducer;
