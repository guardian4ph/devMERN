import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

import moment from "moment";
import Map from "../map/Map";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [image, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage

  const [formData, setFormData] = useState({
    gender: "",
    civilstatus: "",
    birthday: "",
    homeaddress: "",
    organization: "",
    profilepic: "",
    // Work
    website: "",
    location: "",
    bio: "",
    status: "",
    skills: "",
    // Social Media
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    // Emergency Info
    contactperson: "",
    relationship: "",
    contactnumber: "",
    address: "",
    bloodtype: "",
    build: "",
    birthmark: "",
    height: "",
    weight: "",
    insured: "",
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      gender: loading || !profile.gender ? "" : profile.gender,
      civilstatus: loading || !profile.civilstatus ? "" : profile.civilstatus,
      birthday: loading || !profile.birthday ? "" : profile.birthday,
      homeaddress: loading || !profile.homeaddress ? "" : profile.homeaddress,
      profilepic: loading || !profile.profilepic ? "" : profile.profilepic,
      organization:
        loading || !profile.organization ? "" : profile.organization,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      // Social Inputs
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      // Emergency Inputs

      contactperson:
        loading || !profile.contactperson ? "" : profile.contactperson,
      relationship:
        loading || !profile.relationship ? "" : profile.relationship,
      contactnumber:
        loading || !profile.contactnumber ? "" : profile.contactnumber,

      address: loading || !profile.address ? "" : profile.address,
      bloodtype: loading || !profile.bloodtype ? "" : profile.bloodtype,
      build: loading || !profile.build ? "" : profile.build,
      birthmark: loading || !profile.birthmark ? "" : profile.birthmark,
      insured: loading || !profile.insured ? "" : profile.insured,
    });
  }, [loading, getCurrentProfile]);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [displayOrganizationInputs, toggleOrganizationInputs] = useState(false);

  const [displayEmergencyInputs, toggleEmergencyInputs] = useState(false);

  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const {
    gender,
    civilstatus,
    birthday,
    homeaddress,
    organization,
    profilepic,
    website,
    location,
    bio,
    status,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    // emergency info
    contactperson,
    relationship,
    contactnumber,
    address,
    bloodtype,
    build,
    birthmark,
    height,
    weight,
    insured,
  } = formData;

  const onDrop = files => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = dragState => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const onChange = c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const payload = new FormData();
  payload.append("gender", formData.gender);
  payload.append("civilstatus", formData.civilstatus);
  payload.append("birthday", formData.birthday);
  payload.append("homeaddress", formData.homeaddress);
  payload.append("organization", formData.organization);
  payload.append("website", formData.website);
  payload.append("location", formData.location);
  payload.append("status", formData.status);
  payload.append("skills", formData.skills);
  payload.append("bio", formData.bio);
  payload.append("youtube", formData.youtube);
  payload.append("twitter", formData.twitter);
  payload.append("facebook", formData.facebook);
  payload.append("linkedin", formData.linkedin);
  payload.append("instagram", formData.instagram);
  payload.append("profilepic", image);

  const onSubmit = async c => {
    c.preventDefault();
    createProfile(payload, history, true);
    //setFormData("");
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={c => onSubmit(c)}>
        <div className='form-group'>
          <div className='upload-section'>
            <Dropzone
              onDrop={onDrop}
              onDragEnter={() => updateBorder("over")}
              onDragLeave={() => updateBorder("leave")}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  ref={dropRef}
                >
                  <input {...getInputProps()} />
                  <p>
                    <i className='fa fa-camera' aria-hidden='true'></i>
                  </p>
                  {image && (
                    <div>
                      {/* <strong>Selected file:</strong> {image.name} */}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>

            <div className='image-preview2'>
              <img
                className='preview-image'
                src={`/img/${profilepic}`}
                alt='Preview'
              />
            </div>
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className='image-preview2'>
                  <img
                    className='preview-image'
                    src={previewSrc}
                    alt='Preview'
                  />
                </div>
              ) : (
                <div className='preview-message'>
                  {/* <p>No preview available for this file</p> */}
                </div>
              )
            ) : (
              <div className='preview-message2'>
                {/* <p>Image Preview</p> */}
              </div>
            )}
          </div>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleOrganizationInputs(!displayOrganizationInputs)}
            type='button'
            className='btn btn-light'
          >
            Organization
          </button>
          <button
            onClick={() => toggleEmergencyInputs(!displayEmergencyInputs)}
            type='button'
            className='btn btn-light'
          >
            Emergency Information
          </button>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Social Network Links
          </button>

          <span>Optional</span>
        </div>

        {/* hide show button of social Inputs */}

        {displayOrganizationInputs && (
          <Fragment>
            <p className='lead'>
              <i className='fa fa-building'></i> Organization
            </p>
            <div className='form-group'>
              <select name='status' value={status} onChange={c => onChange(c)}>
                <option value='0'>* Select Responder Status</option>
                <option value='Dispatch'>Emergency Dispatch Operator</option>
                <option value='EMS'>Emergency Medical Service</option>
                <option value='Fireman'>Firefighter</option>
                <option value='Policeman'>Police Officer</option>
                <option value='Military'>Military</option>
                <option value='QRT'>Quick Response</option>
                <option value='Traffic Dept.'>Traffic Enforcer</option>
                <option value='LGU Frontliner'>LGU Frontliner</option>
                <option value='Volunteer'>Volunteer</option>
                <option value='Others'>Others</option>
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
                name='organization'
                value={organization}
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
                Please use comma separated values (eg. Patient Care, EMS, EMT,
                CPR, Hazardous Materials, Trauma)
              </small>
            </div>
          </Fragment>
        )}

        {displayEmergencyInputs && (
          <Fragment>
            <p className='lead'>
              <i className='fa fa-building'></i> Emergency Information
            </p>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Contact Person'
                name='contactperson'
                value={contactperson}
                onChange={c => onChange(c)}
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='* Relationship'
                name='relationship'
                value={relationship}
                onChange={c => onChange(c)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='tel'
                placeholder='* 09XX XXX XXXX'
                name='contactnumber'
                value={contactnumber}
                onChange={c => onChange(c)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Address'
                name='address'
                value={address}
                onChange={c => onChange(c)}
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Blood Type'
                name='bloodtype'
                value={bloodtype}
                onChange={c => onChange(c)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Body Build'
                name='build'
                value={build}
                onChange={c => onChange(c)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Birth Mark'
                name='birthmark'
                value={birthmark}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Height'
                name='height'
                value={height}
                onChange={c => onChange(c)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Weight'
                name='weight'
                value={weight}
                onChange={c => onChange(c)}
              />
            </div>

            <div className='form-group'>
              <select
                name='insured'
                value={insured}
                onChange={c => onChange(c)}
              >
                <option value='0'>Insured</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>
          </Fragment>
        )}

        {displaySocialInputs && (
          <Fragment>
            <p className='lead'>
              <i className='fa fa-desktop'></i> Social
            </p>
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

        <p className='lead'>
          <i className='fa fa-address-book'></i> Personal Information
        </p>
        <div className='form-group'>
          <p>Home Address</p>
          <input
            type='text'
            // name='birthday'
            // value={birthday}
            onChange={c => onChange(c)}
            required
          />
        </div>
        <Map />
        <div className='form-group'>
          <select name='gender' value={gender} onChange={c => onChange(c)}>
            <option value='0'>* Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='LGBT'>LGBT</option>
          </select>
          <small className='form-text'>Choose your gender</small>
        </div>

        <div className='form-group'>
          <select
            name='civilstatus'
            value={civilstatus}
            onChange={c => onChange(c)}
          >
            <option value='0'>* Civil Status</option>
            <option value='Single'>Single</option>
            <option value='Married'>Married</option>
            <option value='Widowed'>Widowed</option>
            <option value='Separated'>Separated</option>
          </select>
          <small className='form-text'>Choose civil status</small>
        </div>
        <div className='form-group'>
          <p className='form-text'>Birthday </p>

          <input
            type='date'
            name='birthday'
            value={moment(birthday).format("YYYY-MM-DD")}
            onChange={c => onChange(c)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Home Address'
            name='homeaddress'
            value={homeaddress}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            Organization you are affiliated/member
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself and'
            name='bio'
            value={bio}
            onChange={c => onChange(c)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
