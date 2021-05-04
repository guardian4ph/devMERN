import React, { useState, Fragment, useRef, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import moment from "moment";
// Map
import Search from "../../utils/searchMap";
import Locate from "../../utils/locateMap";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyles from "../layout/MapStyles";
import Moment from "react-moment";
import Geodcode from "react-geocode";

const libraries = ["places"];

const mapContainerStyle = {
  height: `350px`,
  width: "100%",
};

const center = {
  lat: 10.3272994,
  lng: 123.9431079,
};
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const CreateProfile = ({ auth, createProfile, history }) => {
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [marker, setMarker] = useState({ lat: 10.3272994, lng: 123.9431079 });
  const [com_address, setAddress] = useState({
    currentaddress: "",
    city: "",
    area: "",
    state: "",
  });

  const [formData, setFormData] = useState({
    gender: "",
    civilstatus: "",
    birthday: "",
    //Pulled in Map
    completeaddress: "",
    city: "",
    area: "",
    state: "",
    lat: "",
    lng: "",
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
    eaddress: "",
    bloodtype: "",
    build: "",
    birthmark: "",
    height: "",
    weight: "",
    insured: "",
  });
  // Toogle button to show a div
  const [displayPersonalInputs, togglePersonalInputs] = useState(true);
  const [displayOrganizationInputs, toggleOrganizationInputs] = useState(false);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [displayEmergencyInputs, toggleEmergencyInputs] = useState(false);

  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images

  //Map Declarations

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  Geodcode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const [selected, setSelected] = useState(null);

  const getCity = addressArray => {
    let city = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (
        addressArray[index].types[0] &&
        "administrative_area_level_2" === addressArray[index].types[0]
      ) {
        city = addressArray[index].long_name;
        return city;
      }
    }
  };

  const getArea = addressArray => {
    let area = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (addressArray[index].types[0]) {
        for (let j = 0; j < addressArray.length; j++) {
          if (
            "sublocality_level_1" === addressArray[index].types[j] ||
            "locality" === addressArray[index].types[j]
          ) {
            area = addressArray[index].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = addressArray => {
    let state = "";
    for (let index = 0; index < addressArray.length; index++) {
      for (let index = 0; index < addressArray.length; index++) {
        if (
          addressArray[index].types[0] &&
          "administrative_area_level_2" === addressArray[index].types[0]
        ) {
          state = addressArray[index].long_name;
          return state;
        }
      }
    }
  };

  const onMapClick = useCallback(e => {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarker(latlng);
    console.log("create profile onmapclick", marker);
    panTo(latlng);

    Geodcode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(response => {
      console.log("Response", response);
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);

      setAddress({
        currentaddress: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? city : "",
      });
    });
  }, []);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const mapRef = useRef();

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
    console.log("MapRef load is ", map);
    Geodcode.fromLatLng(map.center.lat(), map.center.lng()).then(response => {
      console.log("Response", response);
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);

      setAddress({
        currentaddress: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? city : "",
      });
      setMarker({ lat: map.center.lat(), lng: map.center.lng() });
    });
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    setMarker({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return "Loading Map...";
  // if (com_address)

  const {
    // Personal
    gender,
    civilstatus,
    birthday,
    completeaddress,
    city,
    area,
    state,
    lat,
    lng,

    //Organization
    organization,
    website,
    location,
    bio,
    status,
    skills,
    //Social
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    // Emergency Info
    contactperson,
    relationship,
    contactnumber,
    eaddress,
    bloodtype,
    insured,
  } = formData;

  const onDrop = files => {
    const [uploadedFile] = files;
    setImage(uploadedFile);
    console.log("drop image", image);

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

  const profilePayload = image === null ? `Spotter.png` : image;

  const payload = new FormData();
  payload.append("gender", formData.gender);
  payload.append("civilstatus", formData.civilstatus);
  payload.append("birthday", formData.birthday);
  // Map Pulled
  payload.append("completeaddress", com_address.currentaddress);
  payload.append("city", com_address.city);
  payload.append("area", com_address.area);
  payload.append("state", com_address.state);
  payload.append("lat", marker.lat);
  payload.append("lng", marker.lng);

  //Organization
  payload.append("organization", formData.organization);
  payload.append("website", formData.website);
  payload.append("location", formData.location);
  payload.append("status", formData.status);
  payload.append("skills", formData.skills);
  payload.append("bio", formData.bio);
  //Social
  payload.append("youtube", formData.youtube);
  payload.append("twitter", formData.twitter);
  payload.append("facebook", formData.facebook);
  payload.append("linkedin", formData.linkedin);
  payload.append("instagram", formData.instagram);
  payload.append("profilepic", profilePayload);

  // Emergency Info

  payload.append("contactperson", formData.contactperson);
  payload.append("relationship", formData.relationship);
  payload.append("contactnumber", formData.contactnumber);
  payload.append("eaddress", formData.eaddress);
  payload.append("bloodtype", formData.bloodtype);
  payload.append("insured", formData.insured);

  const onSubmit = async c => {
    c.preventDefault();
    createProfile(payload, history);
  };

  return (
    <Fragment>
      <p className='lead'>Create Your Profile</p>
      <small>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out.
      </small>
      <small style={{ color: "red" }}>* = required field</small>
      <form
        className='form'
        encType='multipart/form-data'
        onSubmit={c => onSubmit(c)}
      >
        <div className='upload-section'>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
            required
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>
                  <i className='fa fa-camera' aria-hidden='true'></i>
                </p>

                {image && console.log("Loaded image", image)}
              </div>
            )}
          </Dropzone>
          <div className='image-preview2'>
            <img
              className='preview-image'
              src={`/img/Spotter.png`}
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
                  required
                />
              </div>
            ) : (
              <div className='preview-message'>
                {/* <p>No preview available for this file</p> */}
              </div>
            )
          ) : (
            <div className='preview-message2'>{/* <p>Image Preview</p> */}</div>
          )}
        </div>

        {/* Toogle Buttons */}
        <div className='dash-buttons'>
          <button
            onClick={() => togglePersonalInputs(!displayPersonalInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-address-book'></i> * Personal Information
          </button>
        </div>

        {displayPersonalInputs && (
          <Fragment>
            {/* google map redered here */}
            <div style={{ display: "block", flexDirection: "row" }}>
              {/* <Locate panTo={panTo} /> */}
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
              >
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    alignContent: "center",
                    width: "100%",
                    zIndex: "1",
                    margin: "1px 2px 2px 1px",
                    marginTop: "2px",
                  }}
                >
                  <Search panTo={panTo} />
                </div>
                <Marker
                  position={{
                    lat: marker.lat,
                    lng: marker.lng,
                  }}
                  icon={{
                    url: "/icons/map/pin.png",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />

                {selected ? (
                  <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                    <div
                      style={{
                        display: "block",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <h4>Close</h4>
                      </div>

                      <div>
                        <p> Incident!</p>
                      </div>
                      <p>
                        Date{" "}
                        <Moment fromNow ago='LLLL'>
                          {selected.time}
                        </Moment>
                      </p>
                    </div>
                  </InfoWindow>
                ) : null}
              </GoogleMap>

              <div className='form-group'>
                <input
                  type='text'
                  name='completeaddress'
                  value={completeaddress}
                  placeholder={com_address.currentaddress}
                  onChange={c => onChange(c)}
                />
                <small className='form-text'> * Home address</small>
                <input
                  style={{ display: "none" }}
                  type='text'
                  name='city'
                  value={city}
                  placeholder={city}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  area
                </small>
                <input
                  style={{ display: "none" }}
                  type='text'
                  name='area'
                  value={area}
                  placeholder={com_address.area}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  Your area
                </small>
                <input
                  style={{ display: "none" }}
                  type='text'
                  name='lat'
                  value={lat}
                  placeholder={marker.lat}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  Your latitude
                </small>
                <input
                  style={{ display: "none" }}
                  type='text'
                  name='lng'
                  value={lng}
                  placeholder={marker.lng}
                  onChange={c => onChange(c)}
                />
              </div>
            </div>
            <div className='form-group'>
              <select
                name='gender'
                value={gender}
                onChange={c => onChange(c)}
                required
              >
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
                required
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
              <textarea
                placeholder='A short bio of yourself'
                name='bio'
                value={bio}
                onChange={c => onChange(c)}
                rows='6'
              ></textarea>
              <small className='form-text'>
                Tell us a little about yourself
              </small>
            </div>
          </Fragment>
        )}
        {/* Organization Toggle */}

        <div className='dash-buttons'>
          <button
            onClick={() => toggleOrganizationInputs(!displayOrganizationInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-building'></i> Company/Organization
          </button>
        </div>

        {displayOrganizationInputs && (
          <Fragment>
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

        <div className='dash-buttons'>
          <button
            onClick={() => toggleEmergencyInputs(!displayEmergencyInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-building'></i> Emergency Information
          </button>
        </div>
        {displayEmergencyInputs && (
          <Fragment>
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
                name='eaddress'
                value={eaddress}
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

        <div className='dash-buttons'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-desktop'></i> Social Network Links
          </button>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(null, { createProfile })(withRouter(CreateProfile));
