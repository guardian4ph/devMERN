import React, { useState, Fragment, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createOpcenProfile } from "../../actions/opcenprofile";
import moment from "moment";
// Map
import Search from "../../utils/searchMap";

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
  height: `250px`,
  width: "100%",
  borderRadius: "5px",
};

const center = {
  lat: 10.336425,
  lng: 123.90789,
};
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const CreateOpcenProfile = ({
  auth,
  history,
  createOpcenProfile,
  stateopcen,
}) => {
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [marker, setMarker] = useState({ lat: 10.336425, lng: 123.90789 });
  const [com_address, setAddress] = useState({
    currentaddress: "",
    city: "",
    area: "",
    state: "",
  });

  const [formData, setFormData] = useState({
    opcen: "",
    established: "",
    logo: "",
    website: "",
    telcontact: "",
    mcontact: "",
    //Pulled in Map
    completeaddress: "",
    city: "",
    area: "",
    state: "",
    lat: "",
    lng: "",

    status: "", //active/disolved
    motto: "",
    opcenhistory: "",

    // Social Media
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });
  // Toogle button to show a div

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

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
  if (!isLoaded) return <Spinner />;
  // if (com_address)

  const {
    opcen,
    established,
    website,
    telcontact,
    mcontact,
    // oranization details
    status, //active/disolved
    motto,
    opcenhistory,
    completeaddress,
    city,
    area,
    state,
    lat,
    lng,
    // Social Media
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const onDrop = files => {
    const [uploadedFile] = files;
    setImage(uploadedFile);

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

  payload.append("opcen", stateopcen.opcen._id);

  payload.append("established", formData.established);

  payload.append("telcontact", formData.telcontact);
  payload.append("mcontact", formData.mcontact);
  // file drop, choosen
  payload.append("logo", profilePayload);
  payload.append("website", formData.website);
  //State pulled
  payload.append("completeaddress", com_address.currentaddress);
  payload.append("city", com_address.city);
  payload.append("area", com_address.area);
  payload.append("state", com_address.state);
  payload.append("lat", marker.lat);
  payload.append("lng", marker.lng);

  //Organization
  payload.append("status", formData.status);
  payload.append("motto", formData.motto);
  payload.append("opcenhistory", formData.opcenhistory);

  //Social
  payload.append("youtube", formData.youtube);
  payload.append("twitter", formData.twitter);
  payload.append("facebook", formData.facebook);
  payload.append("linkedin", formData.linkedin);
  payload.append("instagram", formData.instagram);

  const onSubmit = async c => {
    c.preventDefault();
    console.log("createopcen payload content", payload, formData);
    createOpcenProfile(payload, history);
  };
  return (
    <Fragment>
      <p className='lead'>Create Your Operation Center Profile</p>
      <small>
        <i className='fa fa-building-o'></i> Let's get some information to make
        your profile stand out.
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
                <img className='preview-image' src={previewSrc} alt='Preview' />
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

        <div className='dash-buttons'>
          <button type='button' className='btn btn-dark'>
            <i className='fa fa-address-book'></i> * Operation Center
            Information
          </button>
        </div>

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

          <div
            style={{
              border: "1px solid #fff",
              borderRadius: "10px",
              padding: "10px",
              zIndex: "10",
              backgroundColor: "#fff",
            }}
          >
            <div className='form-group'>
              <input
                type='text'
                name='completeaddress'
                value={completeaddress}
                placeholder={com_address.currentaddress}
                onChange={c => onChange(c)}
              />
              <small className='form-text'> Operation Center Address</small>

              <div className='form-group'>
                <input
                  type='date'
                  name='established'
                  value={moment(established).format("YYYY-MM-DD")}
                  onChange={c => onChange(c)}
                />

                <small className='form-text'>Date established</small>
              </div>
              <div className='form-group'>
                <input
                  type='tel'
                  placeholder='09XX XXX XXXX'
                  name='mcontact'
                  value={mcontact}
                  onChange={c => onChange(c)}
                />
                <small className='form-text'>
                  Your mobile number so your contituents will reach you.
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='tel'
                  placeholder='032 XXX XXXX'
                  name='telcontact'
                  value={telcontact}
                  onChange={c => onChange(c)}
                />
                <small className='form-text'>
                  Land line or your trunk line number
                </small>
              </div>
              <div className='form-group'>
                <textarea
                  placeholder='Tell them what you believe in'
                  name='motto'
                  value={motto}
                  onChange={c => onChange(c)}
                  rows='2'
                ></textarea>
                <small className='form-text'>Your motto or tag line</small>
              </div>
              <div className='form-group'>
                <textarea
                  placeholder='A short history of your operation center'
                  name='opcenhistory'
                  value={opcenhistory}
                  onChange={c => onChange(c)}
                  rows='6'
                ></textarea>
                <small className='form-text'>
                  Tell us a little about your opcen.
                </small>
              </div>

              <input
                style={{ display: "none" }}
                type='text'
                name='city'
                value={city}
                placeholder={city}
                onChange={c => onChange(c)}
              />
              <small className='form-text' style={{ display: "none" }}>
                City
              </small>
              <input
                style={{ display: "none" }}
                type='text'
                name='area'
                value={area}
                placeholder={com_address.area}
                onChange={c => onChange(c)}
              />
              <small className='form-text' tyle={{ display: "none" }}>
                Your area s
              </small>

              <input
                style={{ display: "none" }}
                type='text'
                name='state'
                value={state}
                placeholder={com_address.state}
                onChange={c => onChange(c)}
              />
              <small className='form-text' style={{ display: "none" }}>
                Your state
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

              <div className='form-group'>
                <select
                  name='status'
                  value={status}
                  onChange={c => onChange(c)}
                >
                  <option value='0'>* status</option>
                  <option value='Active'>Active</option>
                  <option value='Disolved'>Disolved</option>
                </select>
                <small className='form-text'>
                  Choose opcen operational status
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
            </div>
          </div>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateOpcenProfile.propTypes = {
  auth: PropTypes.func.isRequired,
  createOpcenProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  stateopcen: state.opcen,
});

export default connect(mapStateToProps, { createOpcenProfile })(
  CreateOpcenProfile
);
