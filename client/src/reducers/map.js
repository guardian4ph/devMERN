import {
  GET_COMPLETE_ADDRESS,
  GET_AREA,
  GET_CITY,
  GET_STATE,
  GET_COUNTRY,
  MAP_LOCATE,
  MAP_SEARCH,
} from "../actions/types";

const initialState = {
  // completeaddress =null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPLETE_ADDRESS:
      return {
        ...state,
        posts: payload, //from the action file
        loading: false,
      };

    default:
      return state;
  }
}
