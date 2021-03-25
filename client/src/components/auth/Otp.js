import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendOtp } from "../../actions/sms";
import { setAlert } from "../../actions/alert";

const Otp = ({ setAlert, sendOtp, auth, sms }) => {
  // Display hide div
  const [displayTimer, hideTimer] = useState(false);
  const [displayBtn, hideBtn] = useState(true);
  // Timer State
  const [seconds, setSeconds] = useState(300);

  const generate = Math.floor(Math.random() * (772881 - 111181 + 1) + 111181);

  const [otp, setOtp] = useState(
    Math.floor(Math.random() * (772881 - 111181 + 1) + 111181)
  );
  //pulled for auth state
  const user = auth._id;
  const number = auth.number;
  const name = auth.name;

  const msg = `Hi ${name}, Proceed with your Change Password for GUARDIAN Account, Your One-Time Password is ${otp} OTP will expire in 15 minutes, If you did not initiate this request, please call your Operation Center administrator`;

  useEffect(() => {
    setOtp(generate);
    sendOtp(user, number, name, msg, otp);

    console.log("OTP Use Effect", otp);
  }, [sendOtp]);

  const [formData, setFormData] = useState({
    sent_otp: "",
  });

  const { sent_otp } = formData;

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
      hideTimer(true);
      hideBtn(false);
    }
  }, [seconds]);

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onResend = () => {
    sendOtp(user, number, name, msg, otp);
    console.log("OTP on Resend", otp);
    setOtp(generate);
    hideTimer(!displayTimer);
    hideBtn(!displayBtn);
    setSeconds(300);
  };

  const onSubmit = async c => {
    c.preventDefault();
    if (sent_otp === sms.otp.sent_otp) {
      console.log("state OTP", sent_otp);
      console.log("state OTP", sms.otp.sent_otp);

      setAlert("Passwords  match", "success");
    } else {
      //register is the action from reducers
      // register({ name, lname, number, email, password });
      setAlert("OTP don't match", "danger");
    }
  };

  return (
    <Fragment>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "block",
            borderRadius: "10px",

            padding: "20px",
          }}
        >
          <h1 className='large text-primary'>Change Password</h1>
          <p className='lead'>
            <i className='fa fa-key' aria-hidden='true'></i> You will receive a
            One-Time Password (OTP) on your registered mobile number.
          </p>

          <form className='form' onSubmit={c => onSubmit(c)}>
            <div className='form-group'>
              <input
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  letterSpacing: "8px",
                }}
                type='password'
                placeholder='XXXXXX'
                name='sent_otp'
                value={sent_otp}
                onChange={c => onChange(c)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <small
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "12px",
                    letterSpacing: ".5px",
                    padding: "2px",
                  }}
                >
                  Did you receive an OTP?
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {displayBtn && (
                  <small
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: "12px",
                      letterSpacing: ".5px",
                      padding: "2px",
                    }}
                  >
                    Resend OTP after {seconds} seconds
                  </small>
                )}
                {displayTimer && (
                  // <input
                  //   type='submit'
                  //   className='btn btn-primary'
                  //   value='Resend'
                  // />
                  <button
                    onClick={onResend}
                    type='button'
                    style={{ padding: "3px" }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            <small
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontSize: "12px",
                letterSpacing: ".5px",
                padding: "2px",
              }}
            >
              If you need to change your mobile number, you may do so through
              Update Profile, or by reaching out to your Operation Center
              Administrator at admin@guardian.ph
            </small>

            {/* <div className='form-group'>
              <input
                type='text'
                placeholder='09173146624'
                name='number'
                value={auth.number}
                onChange={c => onChange(c)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Text here'
                name='msg'
                value={otp}
                onChange={c => onChange(c)}
              />
            </div> */}
            <input type='submit' className='btn btn-primary' value='Proceed' />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Otp.propTypes = {
  sendOtp: PropTypes.func.isRequired,
  isUser: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  sms: state.sms,
});
export default connect(mapStateToProps, { setAlert, sendOtp })(Otp);
