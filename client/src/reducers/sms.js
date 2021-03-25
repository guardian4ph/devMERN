import { SEND_OTP, SEND_OTP_FAIL, REMOVE_OTP } from "../actions/types";

const initialState = {
  otp: null,
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

    //   return state.filter(otps => otps.id !== payload);

    // // return { otps: state.otps.filter(otp => otp.id !== payload) };

    default:
      return state;
  }
}
