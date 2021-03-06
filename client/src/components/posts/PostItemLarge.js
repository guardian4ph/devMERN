import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import CommentItem from "../../components/post/CommentItem";
import CommentForm from "../../components/post/CommentForm";
import { getProfiles } from "../../actions/profile";

const MAX_LENGTH = 150;

const PostItem = ({
  getProfiles,
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, lname, articleImage, user, likes, comments, date },
  profile: { profiles, loading },
  showActions,
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const timeDifference = () => {
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
      return "approximately " + Math.round(elapsed / days) + " days ago";
    } else if (elapsed < years) {
      return "approximately " + Math.round(elapsed / months) + " months ago";
    } else {
      return "approximately " + Math.round(elapsed / years) + " years ago";
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='post-large bg-white'>
          {/* Image post container */}
          <div className='postContainer'>
            <Link to={`/posts/${_id}/${articleImage}`}>
              <img
                className='postImageLarge'
                // style={{ width: "305px", borderRadius: "5px" }}
                src={`/post/${articleImage}`}
                alt='...'
              />
            </Link>
          </div>
          <div style={{ backgroundColor: "#fff", height: "89vh" }}>
            {/* user details */}

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
                            width: "100%",

                            alignItems: "center",
                            padding: "2%",
                            backgroundColor: "#fff",
                            justifyContent: "space-around",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <div className='p'>
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

                            <p style={{ color: "#aaa", fontSize: "10px" }}>
                              {" "}
                              Posted <Moment format='ll'>{date}</Moment> -{" "}
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
                        <p className=' commentFontLarge m f-2'>{text}</p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "35px",
                            margin: "5px",
                            alignItems: "center",
                            padding: "10px",
                            justifyContent: "space-around",
                          }}
                        >
                          {showActions && (
                            <Fragment>
                              {/* Button for like */}

                              <Link
                                onClick={c => addLike(_id)}
                                type='button'
                                className='btn-post '
                              >
                                <i
                                  className='fa fa-thumbs-o-up'
                                  aria-hidden='true'
                                ></i>

                                <span className='p'>
                                  {likes.length > 0 && (
                                    <span>{likes.length}</span>
                                  )}
                                </span>
                              </Link>

                              {/* Button for Unlike */}
                              <Link
                                onClick={c => removeLike(_id)}
                                type='button'
                                className='btn-post'
                              >
                                <i
                                  className='fa fa-thumbs-o-down'
                                  aria-hidden='true'
                                ></i>
                              </Link>
                              <Link to={`/posts/${_id}`} className='btn-post'>
                                <i
                                  className='fa fa-comment-o'
                                  aria-hidden='true'
                                ></i>{" "}
                                {comments.length > 0 && (
                                  <span className='comment-count'>
                                    {comments.length}
                                  </span>
                                )}
                              </Link>

                              <Link to={`/posts/${_id}`} className='btn-post'>
                                <i
                                  className='fa fa-share-square-o'
                                  aria-hidden='true'
                                ></i>{" "}
                              </Link>

                              {!auth.loading && user === auth.user._id && (
                                <button
                                  onClick={c => deletePost(_id)}
                                  type='button'
                                  className='btn-post f-2'
                                >
                                  <i
                                    class='fa fa-trash-o'
                                    aria-hidden='true'
                                  ></i>
                                </button>
                              )}
                            </Fragment>
                          )}
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
            {/* message post  */}
            <div
              style={{
                maxHeight: "380px",

                margin: "10px",
                overflow: "auto",
              }}
            ></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
//console.log(PostItem);
// set show action to true so buttons would not show in single post
PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getProfiles,
})(PostItem);
