import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { connect } from "react-redux";

const ProfileTop = ({
  auth,
  profile: {
    status,
    profilepic,
    organization,
    location,
    website,
    social,
    user: { _id, name, lname, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div>
        <img className='profile-img' src={`/img/${profilepic}`} alt='...' />
      </div>
      {!auth.loading && _id === auth.user._id && (
        <div className='qr-code'>
          <QRCode
            size='160'
            includeMargin='true'
            fgColor='#000000'
            value={_id}
          />
        </div>
      )}

      <h1>
        {name} {lname}
      </h1>
      <p>
        {status} {organization && <span> at {organization}</span>}
      </p>
      <p>{location && <span> at {location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <Link to={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </Link>
        )}
        {social && social.twitter && (
          <Link to={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </Link>
        )}

        {social && social.facebook && (
          <Link to={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </Link>
        )}

        {social && social.linkedin && (
          <Link to={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </Link>
        )}

        {social && social.youtube && (
          <Link to={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </Link>
        )}

        {social && social.instagram && (
          <Link to={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(ProfileTop);
