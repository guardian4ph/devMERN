import React, {
  useState,
  Fragment,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
// import ProfileDefault from "../../img/Spotter.png";
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
import Spinner from "../layout/Spinner";

const libraries = ["places"];

const mapContainerStyle = {
  height: `300px`,
  width: "100%",
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage

  const [formData, setFormData] = useState({
    gender: "",
    civilstatus: "",
    birthday: "",
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
      completeaddress:
        loading || !profile.completeaddress ? "" : profile.completeaddress,

      city: loading || !profile.city ? "" : profile.city,
      area: loading || !profile.area ? "" : profile.area,
      state: loading || !profile.state ? "" : profile.state,
      lat: loading || !profile.lat ? "" : profile.lat,
      lng: loading || !profile.lng ? "" : profile.lng,

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

  const {
    gender,
    civilstatus,
    birthday,
    completeaddress,
    city,
    area,
    state,
    lat,
    lng,
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

  const [image, setFile] = useState(null); // state for storing actual image
  const center = {
    lat: 10.3272994,
    lng: 123.9431079,
  };
  const [marker, setMarker] = useState({ lat: 10.3272994, lng: 123.9431079 });
  const [com_address, setAddress] = useState({
    currentaddress: "",
    city: "",
    area: "",
    state: "",
    lat: "",
    lng: "",
  });
  const [displayPersonalInputs, togglePersonalInputs] = useState(true);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [displayOrganizationInputs, toggleOrganizationInputs] = useState(false);
  const [newAddress, toggleNewAddress] = useState(false);
  const [hideOldAddress, toggleOldAddress] = useState(true);

  const [displayEmergencyInputs, toggleEmergencyInputs] = useState(false);

  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images

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

    toggleOldAddress(!hideOldAddress);
    toggleNewAddress(!newAddress);

    console.log("on Map click", latlng);
    setMarker(latlng);
    console.log("set marker", marker);
    panTo(latlng);

    Geodcode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(response => {
      console.log("Response on map click", response);
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
      console.log("Response on map log", response);
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

  const panTo = useCallback(({ lat, lng }) => {
    setMarker({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return <Spinner />;
  // if (com_address)

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
    dropRef.current.style.borderRadius = "50px";
  };

  const updateBorder = dragState => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
      dropRef.current.style.borderRadius = "50px";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const onChange = c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const profilePayload = image !== null ? image : `${profilepic}`;

  const editAddress =
    completeaddress === com_address.currentaddress
      ? completeaddress
      : com_address.currentaddress;

  const editCity = city === com_address.city ? city : com_address.city;

  const editArea = area === com_address.area ? area : com_address.area;

  const editState = state === com_address.state ? state : com_address.state;

  const editLat = formData.lat === marker.lat ? formData.lat : marker.lat;
  const editLng = formData.lng === marker.lng ? formData.lng : marker.lng;

  const payload = new FormData();
  payload.append("gender", formData.gender);
  payload.append("civilstatus", formData.civilstatus);
  payload.append("birthday", formData.birthday);
  payload.append("completeaddress", editAddress);
  payload.append("city", editCity);
  payload.append("area", editArea);
  payload.append("state", editState);
  payload.append("lat", editLat);
  payload.append("lng", editLng);
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
  payload.append("profilepic", profilePayload);

  // Emergency Info

  payload.append("contactperson", formData.contactperson);
  payload.append("relationship", formData.relationship);
  payload.append("contactnumber", formData.contactnumber);
  payload.append("eaddress", formData.eaddress);
  payload.append("bloodtype", formData.bloodtype);
  payload.append("build", formData.build);
  payload.append("birthmark", formData.birthmark);
  payload.append("height", formData.height);
  payload.append("weight", formData.weight);
  payload.append("insured", formData.insured);

  const onSubmit = async c => {
    c.preventDefault();
    createProfile(payload, history, true);
    console.log("profilePaylod", profilePayload);
  };

  return (
    <Fragment>
      <p className='lead'>Update Your Profile</p>
      <small>
        <i className='fas fa-user'></i> Update information to make your profile
        stand out.
      </small>
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
                </div>
              )}
            </Dropzone>

            <div className='image-preview2'>
              <img
                className='preview-image'
                src={`/img/${profilePayload}`}
                // alt='Preview'
              />
            </div>
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className='image-preview2'>
                  <img className='preview-image' src={previewSrc} />
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

        <div className='dash-buttons'>
          <button
            onClick={() => togglePersonalInputs(!displayPersonalInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-address-book'></i> Personal Information
          </button>
        </div>
        {displayPersonalInputs && (
          <Fragment>
            <div style={{ display: "block", flexDirection: "row" }}>
              <Search panTo={panTo} />
              {/* <Locate panTo={panTo} /> */}
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={{ lat: editLat, lng: editLng }}
                options={options}
                onClick={
                  onMapClick
                  // () => toggleOldAddress(!hideOldAddress),
                  // () => toggleOldAddress(!newAddress))
                }
                onLoad={onMapLoad}
              >
                <Marker
                  position={{ lat: editLat, lng: editLng }}
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

                {/* {selected ? (
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
                ) : null} */}
              </GoogleMap>

              {hideOldAddress && (
                <div className='form-group'>
                  <input type='text' value={completeaddress} />
                  <small className='form-text'> * Home address </small>
                </div>
              )}

              {newAddress && (
                <div className='form-group'>
                  <input
                    type='text'
                    name='completeaddress'
                    value={com_address.currentaddress}
                    onChange={c => onChange(c)}
                  />
                  <small className='form-text'> New Home Address</small>

                  {/* <input
                  // style={{ display: "none" }}
                  type='text'
                  name='city'
                  value={editCity}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  area
                </small>
                <input
                  // style={{ display: "none" }}
                  type='text'
                  name='area'
                  value={editArea}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  Your area
                </small>
                <input
                  // style={{ display: "none" }}
                  type='text'
                  name='lat'
                  value={editLat}
                  onChange={c => onChange(c)}
                />
                <small className='form-text' style={{ display: "none" }}>
                  Your latitude
                </small>
                <input
                  // style={{ display: "none" }}
                  type='text'
                  name='lng'
                  value={editLng}
                  onChange={c => onChange(c)}
                /> */}
                </div>
              )}
            </div>

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
              <textarea
                placeholder='A short bio of yourself and'
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
        <div className='dash-buttons'>
          <button
            onClick={() => toggleOrganizationInputs(!displayOrganizationInputs)}
            type='button'
            className='btn btn-dark'
          >
            <i className='fa fa-building'></i> Organization/Company
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
