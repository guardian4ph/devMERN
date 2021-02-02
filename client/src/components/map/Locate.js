import React from "react";

const Locate = ({ panTo }) => {
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
};

export default Locate;
