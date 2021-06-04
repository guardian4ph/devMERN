import React, {
  Fragment,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyles from "../layout/MapStyles";
import Moment from "react-moment";
import Geodcode from "react-geocode";
import Search from "../../utils/searchMap";
import Locate from "../../utils/locateMap";
import { clearIncident, submitIncident } from "../../actions/incident";

const libraries = ["places"];

const mapContainerStyle = {
  height: `250px`,
  width: "100%",
  borderRadius: "5px",
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const IncidentCreate = ({
  incident: { type, incident, loading },
  clearIncident,
  submitIncident,
  createIncident,
  user,
}) => {
  const [formData, setFormData] = useState({
    completeaddress: "",

    city: "",
    state: "",
    area: "",
    lat: "",
    lng: "",
  });

  const { completeaddress, lat, lng, city, state, area } = formData;
  const [marker, setMarker] = useState({ lat: 10.3272994, lng: 123.9431079 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(currentloc => {
      const latlng = {
        lat: currentloc.coords.latitude,
        lng: currentloc.coords.longitude,
      };
      setMarker(latlng);
    });
  }, []);

  const [com_address, setAddress] = useState({
    completeaddress: "",
    city: "",
    area: "",
    state: "",
  });

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
    panTo(latlng);

    Geodcode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(response => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);

      setAddress({
        completeaddress: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? city : "",
      });
    });
  }, []);

  const mapRef = useRef();

  const onMapLoad = useCallback(map => {
    mapRef.current = map;

    Geodcode.fromLatLng(map.center.lat(), map.center.lng()).then(response => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);

      setAddress({
        completeaddress: address ? address : "",
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
    mapRef.current.setZoom(16);

    Geodcode.fromLatLng(lat, lng).then(response => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);

      setAddress({
        completeaddress: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? city : "",
      });
    });
  }, []);

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return <Spinner />;
  // if (com_address)

  const onChange = async c =>
    setFormData({ ...formData, [c.target.type]: c.target.value });

  const scompleteaddress = com_address.completeaddress;
  const scity = com_address.city;
  const sstate = com_address.state;
  const sarea = com_address.area;
  const slat = marker.lat;
  const slng = marker.lng;

  const onSubmit = async c => {
    c.preventDefault();
    submitIncident({
      user,
      type,
      scompleteaddress,
      scity,
      sstate,
      sarea,
      slat,
      slng,
    });
  };
  if (createIncident && incident !== null) {
    return <Redirect to={`/incident-main`} />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          margin: "auto",
          position: "fixed",
          top: "20%",
          height: "90vh",
          width: "640px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className='large text-primary'>Incident details</h1>

          <div
            style={{
              display: "flex",
              marginTop: "18px",
            }}
          >
            <p>Send incident type </p>
            <h4> , "{type}"</h4> <p>... please verify the location.</p>
          </div>
          <form className='form' onSubmit={c => onSubmit(c)}>
            <Fragment>
              {/* google map redered here */}
              <div style={{ display: "block", flexDirection: "row" }}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={13}
                  center={marker}
                  options={options}
                  onClick={onMapClick}
                  onLoad={onMapLoad}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "relative",

                      justifyContent: "space-between",
                      width: "100%",
                      zIndex: "1",
                      margin: "1px 2px 2px 1px",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        alignContent: "center",

                        width: "100%",
                        zIndex: "1",
                        margin: "1px 2px 2px 1px",
                        marginTop: "2px",
                      }}
                    >
                      <Search panTo={panTo} />
                      <Locate panTo={panTo} />
                    </div>
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
                    placeholder={com_address.completeaddress}
                    onChange={c => onChange(c)}
                  />
                  <small className='form-text'> Incident location</small>

                  <div style={{ display: "none" }}>
                    <input
                      // style={{ display: "none" }}
                      type='text'
                      name='city'
                      value={city}
                      placeholder={com_address.city}
                      onChange={c => onChange(c)}
                    />
                    <small className='form-text'>City</small>

                    <input
                      // style={{ display: "none" }}
                      type='text'
                      name='state'
                      value={state}
                      placeholder={com_address.state}
                      onChange={c => onChange(c)}
                    />
                    <small className='form-text'>State</small>
                    <input
                      // style={{ display: "none" }}
                      type='text'
                      name='area'
                      value={area}
                      placeholder={com_address.area}
                      onChange={c => onChange(c)}
                    />
                    <small className='form-text'>Your area</small>
                    <input
                      // style={{ display: "none" }}
                      type='text'
                      name='lat'
                      value={lat}
                      placeholder={marker.lat}
                      onChange={c => onChange(c)}
                    />
                    <small className='form-text'>Your latitude</small>
                    <input
                      // style={{ display: "none" }}
                      type='text'
                      name='lng'
                      value={lng}
                      placeholder={marker.lng}
                      onChange={c => onChange(c)}
                    />
                    <small className='form-text'>Your longitude</small>
                  </div>
                </div>
              </div>
            </Fragment>
            <input
              className='btn-full btn-primary'
              type='submit'
              value='Send'
            />
            <Link
              className='btn-full alert-danger'
              to='/posts'
              onClick={e => clearIncident()}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

IncidentCreate.propTypes = {
  incident: PropTypes.object.isRequired,
  submitIncident: PropTypes.func.isRequired,
  clearIncident: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createIncident: PropTypes.bool,
};

const mapStateToProps = state => ({
  incident: state.incident,
  user: state.auth.user._id,
  createIncident: state.incident.createIncident,
});

const mapDispatchToProps = {
  clearIncident,
  submitIncident,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentCreate);
