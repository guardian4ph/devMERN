import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCreateIncident } from "../../actions/incident";

const IncidentModal = ({ setCreateIncident }) => {
  // putt state to close modal toogle prop like modal
  return (
    // <div className='modal' onClick={props.onClose}>
    <div className='modal'>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='grid-container'>
          <div
            className='Ambulance emergencyicon'
            onClick={c => setCreateIncident("Ambulance")}
          >
            <img
              className='emergencyimg'
              src='/icons/incident/Medical.png'
              alt=''
            />
            <p>Ambulance</p>
          </div>
          <div
            className='Police emergencyicon'
            onClick={c => setCreateIncident("Crime")}
          >
            <img
              className='emergencyimg'
              src='/icons/incident/Crime.png'
              alt=''
            />
            <p>Police</p>
          </div>
          <div
            className='Fire emergencyicon'
            onClick={c => setCreateIncident("Fire")}
          >
            <img
              className='emergencyimg'
              src='/icons/incident/Fire.png'
              alt=''
            />
            <p>Fire</p>
          </div>
          <div
            className='General emergencyicon'
            onClick={c => setCreateIncident("General")}
          >
            <img
              className='emergencyimg'
              style={{ height: "90px", width: "105px" }}
              src='/icons/incident/Call.png'
              alt=''
            />
            <p>General</p>
          </div>
          <div className='Corona' onClick={c => setCreateIncident("Covid")}>
            <img
              className='emergencyimg'
              style={{ height: "90px", width: "90px" }}
              src='/icons/incident/Corona.png'
              alt=''
            />
            <p>CoVid-19</p>
          </div>
        </div>
      </div>
    </div>
  );
};

IncidentModal.propTypes = {
  setCreateIncident: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  props: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setCreateIncident })(IncidentModal);
