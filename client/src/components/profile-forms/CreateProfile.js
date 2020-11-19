import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    bio,
    status,
    // githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={c => onSubmit(c)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={c => onChange(c)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Dispatch'>Emergency Dispatch Operator</option>
            <option value='EMS'>Emergency Medical Service</option>
            <option value='Fire Dept.'>Firefighter</option>
            <option value='Police Dept.'>Police Officer</option>
            <option value='Military'>Military</option>
            <option value='QRT'>Quick Response</option>
            <option value='Traffic Dept.'>Traffic Enforcer</option>
            <option value='LGU Frontliner'>LGU Frontliner</option>
            <option value='Volunteer'>Volunteer</option>
            <option value=''>Others</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your emergency response
            career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Organization'
            name='company'
            value={company}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            Organization you are affiliated/member
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>Our organization website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Address'
            name='location'
            value={location}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>City or Municipalilty located</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Patient Care, EMS, EMT, CPR,
            Hazardous Materials, Trauma)
          </small>
        </div>
        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div> */}
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself and'
            name='bio'
            value={bio}
            onChange={c => onChange(c)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={c => onChange(c)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
