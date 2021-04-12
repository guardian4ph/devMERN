import { CREATE_OPCEN } from "../actions/types";

const initialState = {
  createOpcen: false,
  type: null,
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

    default:
      return state;
  }
}
