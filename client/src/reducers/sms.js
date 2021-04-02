import {
  SEND_OTP,
  SEND_OTP_FAIL,
  REMOVE_OTP,
  OTP_MATCH,
  OTP_NOT_MATCH,
} from "../actions/types";

const initialState = {
  otp: null,
  number: null,
  isMatch: false,
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
        otp: payload,

        loading: false,
      };

    case SEND_OTP_FAIL:
      return {
        ...state,
        error: payload,
      };
    case REMOVE_OTP:
      return {
        ...state,
        otp: null,
        loading: false,
      };

    case OTP_MATCH:
      return {
        ...state,
        otp: null,

        isMatch: true,
        loading: false,
      };

    case OTP_NOT_MATCH:
      return {
        ...state,
        isMatch: false,
        number: null,
        loading: true,
      };

    //   return state.filter(otps => otps.id !== payload);

    // // return { otps: state.otps.filter(otp => otp.id !== payload) };

    default:
      return state;
  }
}
