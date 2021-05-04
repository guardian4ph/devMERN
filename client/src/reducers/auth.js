import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  // FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_DOEST_EXIST,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CHANGED,
  USER_OPCEN_ADMIN,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isUser: null,
  loading: true,
  user: null,
  isOpcenAdmin: false,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case PASSWORD_CHANGED:
      //save token to local storage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isUser: true,
        loading: false,
      };

    case USER_OPCEN_ADMIN:
      //save token to local storage

      return {
        ...state,
        isAuthenticated: true,
        isUser: true,
        isOpcenAdmin: payload,
        loading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        isUser: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case CHANGE_PASSWORD_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
    case USER_DOEST_EXIST:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
