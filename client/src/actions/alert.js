import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//double dispatch can be used because of thunk Middleware
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    //Send the data to the reducer SET_ALERT
    payload: { msg, alertType, id },
  });
  //only send the id to the payload by   "payload: id"
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
