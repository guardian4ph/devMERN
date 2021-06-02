import React from "react";

function Locate({ panTo }) {
  return (
    <button
      className='map-center'
      onClick={e => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
          position => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },

          () => null
        );
      }}
    >
      <i className='far fa-dot-circle fa-lg' aria-hidden='true'></i>
    </button>
  );
}

export default Locate;
