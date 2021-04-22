import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOpcen } from "../../actions/opcen";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

export const OpcenItem = ({
  getOpcen,
  opcen: { _id, user, name, category, type, date, loading },
}) => {
  return (
    <Fragment>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "150px",
              height: "150px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                padding: "5px",
                background: "#fff",
                borderRadius: "10px",
                width: "150px",
                height: "150px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                  justifyContent: "space-around",
                }}
              >
                <Link
                  className='smallIcon'
                  onClick={c => getOpcen(user, _id)}
                  to={`/operation-center/${user}/${_id}`}
                >
                  <h5>{name}</h5>

                  <small>{category}</small>
                  <small> {type} </small>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

OpcenItem.propTypes = {
  opcen: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getOpcen })(OpcenItem);
