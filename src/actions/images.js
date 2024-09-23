import {
    CREATE_IMAGE,
    GET_IMAGE,
    DELETE_IMAGE
} from "./types";
  
import ImageDataService from "../services/images.service";

// Action for retrieving all customers
export const getImage = (token, id) => async (dispatch) => {
    try {
        const res = await ImageDataService.get(token, id);
        dispatch({
            type: GET_IMAGE,
            payload: res.data,  // Array of customers
        });
    } catch (err) {
        // Handle errors in more detail
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error('Error response:', err.response.data);
          console.error('Error status:', err.response.status);
          console.error('Error headers:', err.response.headers);
        } else if (err.request) {
          // Request was made but no response received
          console.error('Request error:', err.request);
        } else {
          // Other errors during request setup
          console.error('Error message:', err.message);
        }
    
        // Optionally, you can dispatch an action to set an error in the Redux store
        dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: err.message });
      }
};

// Action for creating a customer
export const createImage = (token,data) => async (dispatch) => {
    try {
        const res = await ImageDataService.create(token,data);
  
        dispatch({
            type: CREATE_IMAGE,
            payload: res.data,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
  
  
// Action for deleting a customer
export const deleteImage = (token, id) => async (dispatch) => {
    try {
        await ImageDataService.delete(token, id);
  
        dispatch({
            type: DELETE_IMAGE,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
  