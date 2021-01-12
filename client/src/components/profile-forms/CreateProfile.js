import React, { useState, Fragment, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [image, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage

  const [formData, setFormData] = useState({
    company: "",
    profilepic: "",
    website: "",
    location: "",
    bio: "",
    status: "",

    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });
  // Toogle button to show a div
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const {
    company,
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

  //replaced by ondrop
  // const onFileChange = c => {
  //   setImage(c.target.files[0]);
  //   setImageName(c.target.files[0].name);
  // };

  const onChange = c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const payload = new FormData();
  payload.append("company", formData.company);
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
    createProfile(payload, history);
    //setFormData("");
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        Responder profile stand out
      </p>
      <small>* = required field</small>
      <form
        className='form'
        encType='multipart/form-data'
        onSubmit={c => onSubmit(c)}
      >
        <div className='form-group'>
          <div>
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
                    <p>Drag and drop a file OR click here to select a file</p>
                    {image && (
                      <div>
                        <strong>Selected file:</strong> {image.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              {previewSrc ? (
                isPreviewAvailable ? (
                  <div className='image-preview'>
                    <img
                      className='preview-image'
                      src={previewSrc}
                      alt='Preview'
                      required
                    />
                  </div>
                ) : (
                  <div className='preview-message'>
                    <p>No preview available for this file</p>
                  </div>
                )
              ) : (
                <div className='preview-message'>
                  <p>Image Preview</p>
                </div>
              )}
            </div>

            {/* Replace by dropzone  */}
            {/* <label htmlFor='file'>
              Upload Photo
              <input
                type='file'
                onChange={c => onFileChange(c)}
                accept='image/*'
                multiple
              />
            </label> */}
          </div>
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
        {/* hide show button of social Inputs */}
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
