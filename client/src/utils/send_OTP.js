import React from "react";

//genrate 4 digit random number
const send_OTP = otp => {};
let otp = Math.floor(Math.random() * 899999 + 100000);

const otp_txt = `Hi Guardian 
    your PIN is  ${otp}
    , please don't share this to anyone. Expires in 15mins `;

export default send_OTP;
