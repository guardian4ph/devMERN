import {
  CREATE_INCIDENT,
  ERROR_CREATE_INCIDENT,
  INCIDENT_SUMMIT_SUCCESS,
  INCIDENT_SUMMIT_FAIL,
  GET_INCIDENT_BY_ID,
  GET_INCIDENTS_BY_ID_FAILS,
  GET_INCIDENTS,
  GET_INCIDENTS_FAIL,
  CLEAR_INCIDENT,
  GET_INCIDENT_BY_OPCEN,
  GET_INCIDENT_BY_USER,
} from "../actions/types";

const initialState = {
  createIncident: false,
  type: null,
  incident: null,
  incidents: null,
  incidentbyopcen: null,
  incidentbyuser: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INCIDENT:
      return {
        ...state,
        createIncident: true,
        type: payload, //from the action file
        loading: false,
      };
    case GET_INCIDENTS:
      return {
        ...state,
        createIncident: false,
        incidents: payload,
        loading: false,
      };
    case INCIDENT_SUMMIT_SUCCESS:
      return {
        ...state,
        createIncident: true,
        incident: payload, //from the action file
        loading: false,
      };
    case CLEAR_INCIDENT:
      return {
        ...state,
        createIncident: false,
        type: null,
        incident: null,
        incidents: null,
        loading: false,
      };

    default:
      return state;
  }
}
