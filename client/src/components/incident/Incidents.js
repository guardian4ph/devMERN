import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Incidents = ({ incident, opcen_id }) => {
  const timeDifference = date => {
    var current = new Date();
    var formatDate = new Date(date);

    var minutes = 60 * 1000;
    var hours = minutes * 60;
    var days = hours * 24;
    var months = days * 30;
    var years = days * 365;

    var elapsed = current - formatDate;

    if (elapsed < minutes) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < hours) {
      return Math.round(elapsed / minutes) + " minutes ago";
    } else if (elapsed < days) {
      return Math.round(elapsed / hours) + " hours ago";
    } else if (elapsed < months) {
      return "approximately " + Math.round(elapsed / days) + " day(s) ago";
    } else if (elapsed < years) {
      return "approximately " + Math.round(elapsed / months) + " month(s) ago";
    } else {
      return "approximately " + Math.round(elapsed / years) + " year(s) ago";
    }
  };
  const incidents = incident.map(inc => (
    <tr key={inc._id}>
      <td>{inc.type}</td>
      <td className='hide-sm'>{inc.scompleteaddress}</td>
      <td>
        <Moment format='LTS'>{inc.date}</Moment> - {timeDifference(inc.date)}
      </td>
      <td>
        {inc.user.name} {inc.user.lname}
      </td>
      <td>
        <button
          //   onClick={() => deleteEducation(inc._id)}
          className='btn btn-danger'
        >
          <i className='fa fa-trash-o' aria-hidden='true'></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Type</th>
              <th className='hide-sm'>Location</th>
              <th className='hide-sm'>Time</th>
              <th>Volunteer</th>
              <th> Action</th>
            </tr>
          </thead>
          {/* Loop thru the database */}
          <tbody>{incidents}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

Incidents.propTypes = {
  incidents: PropTypes.array.isRequired,
  opcen_id: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Incidents);
