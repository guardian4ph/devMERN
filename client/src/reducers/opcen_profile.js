import {
  GET_OPCEN_PROFILE,
  PROFILE_OPCEN_ERROR,
  CLEAR_OPCEN_PROFILE,
  UPDATE_OPCEN_PROFILE,
  GET_OPCEN_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: true,
  error: {},
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OPCEN_PROFILE:
    case UPDATE_OPCEN_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_OPCEN_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case PROFILE_OPCEN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_OPCEN_PROFILE:
      return {
        ...state,
        profile: null,
        //repos:[],
        loading: false,
      };

    default:
      return state;
  }
}
