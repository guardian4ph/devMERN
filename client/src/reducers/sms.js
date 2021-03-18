import { SEND_OTP, SEND_OTP_FAIL } from "../actions/types";

const initialState = {
  number: [],
  msg: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_OTP:
      return {
        ...state,
        number: payload,
        msg: payload,
        loading: false,
      };

    case SEND_OTP_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
