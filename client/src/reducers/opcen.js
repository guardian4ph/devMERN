import {
  CREATE_OPCEN,
  ERROR_CREATE_OPCEN,
  OPCEN_REGISTER_SUCCESS,
  OPCEN_REGISTER_FAIL,
  GET_OPCENS,
  GET_OPCENS_FAIL,
  GET_OPCEN,
  GET_OPCEN_FAIL,
} from "../actions/types";

const initialState = {
  createOpcen: false,
  type: null,
  opcen: null,
  opcens: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_OPCEN:
      return {
        ...state,
        createOpcen: true,
        type: payload, //from the action file
        loading: false,
      };
    case OPCEN_REGISTER_SUCCESS:
      return {
        ...state,
        createOpcen: true,
        opcen: payload, //from the action file
        loading: false,
      };
    case GET_OPCENS:
      return {
        ...state,
        createOpcen: false,
        opcens: payload, //from the action file
        loading: false,
      };
    case GET_OPCEN:
      return {
        ...state,
        createOpcen: false,
        opcen: payload, //from the action file
        loading: false,
      };
    default:
      return state;
  }
}
