import { CREATE_INCIDENT, ERROR_CREATE_INCIDENT } from "../actions/types";
const initialState = {
  createIncident: false,
  type: null,
  incident: null,
  incidents: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INCIDENT:
      return {
        ...state,
        createOpcen: true,
        type: payload, //from the action file
        loading: false,
      };

    default:
      return state;
  }
}
