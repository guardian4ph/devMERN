import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOpcen } from "../../actions/opcen";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getOpcenProfileById } from "../../actions/opcenprofile";

export const OpcenItem = ({
  getOpcen,
  getOpcenProfileById,
  opcen: { _id, user, name, category, type, date, loading },
  auth,
}) => {
  useEffect(() => {
    getOpcen(auth.user._id, _id);
  });
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
              width: "200px",
              height: "200px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                padding: "5px",
                background: "#fff",
                borderRadius: "10px",
                width: "200px",
                height: "200px",
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
                  className='bigIcon'
                  onClick={c => getOpcen(user, _id)}
                  to={`/operation-center/${user}/${_id}`}
                >
                  <div
                    style={{
                      height: "40px",
                      margin: "auto",
                      padding: "8px",
                      width: "40px",
                      borderRadius: "50%",
                      background: "#ccc",
                    }}
                  >
                    {type === "Gov" ? (
                      <i className='fas fa-landmark' aria-hidden='true'></i>
                    ) : type === "Pri" ? (
                      <i className='fa fa-hand-paper-o' aria-hidden='true'></i>
                    ) : (
                      <i className='fa fa-building-o' aria-hidden='true'></i>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "10px",
                      marginTop: "3px",
                      padding: " 5px 0 5px 0 ",
                    }}
                  >
                    {name}
                  </p>

                  <p
                    style={{
                      fontSize: "8px",
                      lineHeight: "10px",
                      color: "#333",
                    }}
                  >
                    {category}
                  </p>
                  <div
                    style={{
                      height: "25px",
                      width: "25px",

                      margin: "auto",
                      marginTop: "10px",
                      alignSelf: "end",
                      padding: "1px",

                      borderRadius: "5px",
                      background: "#dc3545",
                      color: "#fff",
                    }}
                  >
                    <i className='fa fa-trash-o' aria-hidden='true'></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

OpcenItem.propTypes = {
  opcen: PropTypes.object.isRequired,
  getOpcenProfileById: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getOpcen, getOpcenProfileById })(
  OpcenItem
);
