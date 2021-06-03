import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import Spinner from "../layout/Spinner";

const MAX_LENGTH = 150;

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  profile: { profiles, loading },
  post: { _id, text, name, lname, articleImage, user, likes, comments, date },
  showActions,
}) => {
  const [shortComment, toggleShortComment] = useState(true);
  const [fullComment, toggleFullComment] = useState(false);

  const onButtonClick = useCallback(
    e => {
      toggleShortComment(!shortComment);
      toggleFullComment(!fullComment);
    },
    [fullComment, shortComment]
  );

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
        <div className='comment bg-white'>
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
                          height: "70px",
                          margin: "0px 1px",
                          alignItems: "center",
                          paddingRight: "2%",
                          paddingLeft: "2%",
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

                          <p className='post-date p-11 '>
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

          <div>
            <div>
              {text.length > MAX_LENGTH ? (
                <div className=' commentFont m f-2'>
                  {shortComment && (
                    <div>
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
            <div
              style={{
                background: "#eee",
                margin: "auto",
                maxWidth: "100%",
              }}
            >
              <Link to={`/posts/${_id}/${articleImage}`}>
                <img
                  // style={{ width: "305px", borderRadius: "5px" }}
                  className='postImage'
                  src={`/post/${articleImage}`}
                  alt='...'
                />
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "70px",
              // margin: "0px 5px",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {showActions && (
              <Fragment>
                {/* Button for like */}

                <Link
                  onClick={c => addLike(_id)}
                  type='button'
                  className='btn-post f-2 '
                >
                  <i className='fa fa-thumbs-o-up' aria-hidden='true'></i>
                  <p style={{ marginLeft: "3px" }}> Like</p>
                  <span className='p'>
                    {likes.length > 0 && <span>{likes.length}</span>}
                  </span>
                </Link>

                {/* Button for Unlike */}
                <Link
                  onClick={c => removeLike(_id)}
                  type='button'
                  className='btn-post f-2'
                >
                  <i className='fa fa-thumbs-o-down' aria-hidden='true'></i>
                  <p style={{ marginLeft: "3px" }}>Unlike</p>
                </Link>
                <Link to={`/posts/${_id}`} className='btn-post f-2'>
                  <i className='fa fa-comment-o' aria-hidden='true'></i>{" "}
                  <p style={{ marginLeft: "3px" }}>Comments </p>
                  {comments.length > 0 && (
                    <span className='p'>{comments.length}</span>
                  )}
                </Link>

                <Link to={`/posts/${_id}`} className='btn-post f-2'>
                  <i className='fa fa-share-square-o' aria-hidden='true'></i>{" "}
                  <p style={{ marginLeft: "3px" }}>Share</p>
                </Link>

                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={c => deletePost(_id)}
                    type='button'
                    className='btn-post f-2'
                  >
                    <i className='fa fa-trash-o' aria-hidden='true'></i>
                  </button>
                )}
              </Fragment>
            )}
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
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
