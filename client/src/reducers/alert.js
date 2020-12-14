import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];
// eslint-disable-next-line
export default function (state = initialState, action) {
  //type of action.. payload is the data
  //deconstruct action
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      //...state copies the state pass in props (state = initialState, action)
      // return [...state, payload] state and payload so it can inform redux of the state
      // payload is the content pass such from the reducer
      // EXAMPLE dispatch({
      //    type: SET_ALERT,
      //    payload: { msg, alertType, id },
      //  });
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
