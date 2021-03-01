import React, { Fragment, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
import Spinner from "../layout/Spinner";

const MAX_LENGTH = 150;

const CommentItem = ({
  profile: { profiles, loading },
  postId,
  comment: { _id, text, name, lname, profilepic, user, date },
  auth,
  deleteComment,
}) => {
  const [shortComment, toggleShortComment] = useState(true);
  const [fullComment, toggleFullComment] = useState(false);

  const timeDifference = () => {
    var current = new Date();
    var formatDate = new Date(date);

    console.log("Current Date", current);
    var minutes = 60 * 1000;
    var hours = minutes * 60;
    var days = hours * 24;
    var months = days * 30;
    var years = days * 365;

    var elapsed = current - formatDate;
    console.log("db date", formatDate);
    if (elapsed < minutes) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < hours) {
      return Math.round(elapsed / minutes) + " minutes ago";
    } else if (elapsed < days) {
      return Math.round(elapsed / hours) + " hours ago";
    } else if (elapsed < months) {
      return "approximately " + Math.round(elapsed / days) + " days ago";
    } else if (elapsed < years) {
      return "approximately " + Math.round(elapsed / months) + " months ago";
    } else {
      return "approximately " + Math.round(elapsed / years) + " years ago";
    }
  };

  const onButtonClick = useCallback(e => {
    toggleShortComment(!shortComment);
    toggleFullComment(!fullComment);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='comment bg-white p-1 my-1'>
          <div style={{ width: "100%" }}>
            <Link to={`/profile/${user}`}>
              {/* map all profiles here */}
              {profiles.length > 0 ? (
                profiles.map(profile => {
                  if (profile.user._id === user) {
                    // <PostHeader key={profile._id} profile={profile} />;
                    // console.log(" Profile", profile._id);
                    return (
                      <Fragment>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "60px",
                            margin: "0px 1px",
                            alignItems: "center",

                            justifyContent: "space-around",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: "10px",
                            }}
                          >
                            <img
                              className='post-profile'
                              src={`/img/${profile.profilepic}`}
                              alt='...'
                            />{" "}
                          </div>
                          <div
                            style={{
                              width: "65%",
                              marginLeft: "20px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <h4 className='p-11'>{name}</h4>{" "}
                              <h4 className='p-11'>{lname}</h4>{" "}
                            </div>

                            <p className='post-date  f-1 '>
                              {" "}
                              Posted <Moment format='ll'>{date}</Moment>
                              {timeDifference()}
                            </p>
                          </div>
                          <div style={{ width: "20%" }}></div>
                          <div style={{ width: "5%" }}>
                            <i
                              className='fa fa-ellipsis-h'
                              aria-hidden='true'
                            ></i>
                          </div>
                        </div>
                      </Fragment>
                    );
                  }
                })
              ) : (
                <div>
                  <img
                    className='post-profile'
                    src={`/img/Spotter.png`}
                    alt='...'
                  />
                </div>
              )}
            </Link>
          </div>
          <div>
            <div>
              {text.length > MAX_LENGTH ? (
                <div className=' commentFont m f-2'>
                  {shortComment && (
                    <div style={{ textIndent: "20px" }}>
                      {`${text.substring(0, MAX_LENGTH)}...`}
                      <button
                        className='btn-comment'
                        onClick={onButtonClick}
                        type='button'
                      >
                        see more
                      </button>
                    </div>
                  )}
                  {fullComment && (
                    <div>
                      <p style={{ whiteSpace: "pre-line" }}>{text}</p>
                      {/* <button
                        className='btn-comment'
                        onClick={onButtonClick}
                        type='button'
                      >
                        see less
                      </button> */}
                    </div>
                  )}
                </div>
              ) : (
                <p className='commentFont m f-2'>{text}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
