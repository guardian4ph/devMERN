import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyles from "../layout/MapStyles";
import Moment from "react-moment";
import Geodcode from "react-geocode";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const mapContainerStyle = {
  height: `400px`,
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

export default function BearFinder(address) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  Geodcode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const [marker, setMarker] = useState({ lat: 10.3272994, lng: 123.9431079 });
  const [com_address, setAddress] = useState(
    { currentaddress: "", city: "", area: "", state: "" },
    []
  );
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
      console.log("Response", response);
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        state = getState(addressArray),
        area = getArea(addressArray);
      // console.log("City is", city);
      // console.log("Area is", area);
      // console.log("State is", state);
      // console.log("Address is", address);
      setAddress({
        currentaddress: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? city : "",
      });
    });
  }, []);

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

  return (
    <div>
      {/* <img className='mapimg' src='/icons/hd.png' alt='' /> */}

      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
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
      <div>
        <p>Addess is {com_address.currentaddress}</p>
      </div>
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 10.3272994, lng: () => 123.9431079 },
      radius: 200 * 1000,
    },
  });

  return (
    <div style={{ display: "block", width: "100%" }}>
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            panTo({ lat, lng });
            // console.log(lat, lng);
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          className='input'
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Search address'
        />
        <ComboboxPopover>
          <ComboboxList>
            {/* Suggestions  */}
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      style={{ width: "50px", height: "50px" }}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log(position);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src='/icons/map/compass-solid.svg' alt='' />
    </button>
  );
}
