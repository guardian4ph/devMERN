import React, { Fragment } from "react";
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
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='post bg-white p-1 my-1'>
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
                          margin: "0px 5px",
                          alignItems: "center",
                          justifyContent: "space-around",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <img
                          className='post-profile'
                          src={`/img/${profile.profilepic}`}
                          alt='...'
                        />
                        <div className='text-primary'>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <h4 className='my-1'>{name}</h4>{" "}
                            <h4 className='my-1'>{lname}</h4>{" "}
                          </div>

                          <p className='post-date '>
                            {" "}
                            Posted <Moment format='LLLL'>{date}</Moment>
                          </p>
                        </div>
                        <div style={{ width: "180px" }}></div>
                        <div>
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
                <div className='m-1'>
                  {`${text.substring(0, MAX_LENGTH)}...`}{" "}
                  <Link to={`/posts/${_id}/${articleImage}`}>see more</Link>
                </div>
              ) : (
                <p className='m-1'>{text}</p>
              )}
            </div>
            <div style={{ background: "#eee", padding: "2px 2px" }}>
              <Link to={`/posts/${_id}/${articleImage}`}>
                <img
                  // style={{ width: "305px", borderRadius: "5px" }}
                  style={{
                    maxWidth: "360px",
                    margin: "auto",
                    display: "flex",
                    borderRadius: "5px",
                  }}
                  src={`/img/${articleImage}`}
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
              margin: "0px 5px",
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
                  className='btn-post '
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
                  className='btn-post'
                >
                  <i className='fa fa-thumbs-o-down' aria-hidden='true'></i>
                  <p style={{ marginLeft: "3px" }}>Unlike</p>
                </Link>
                <Link to={`/posts/${_id}`} className='btn-post'>
                  <i className='fa fa-comment-o' aria-hidden='true'></i>{" "}
                  <p style={{ marginLeft: "3px" }}>Comments </p>
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>

                <Link to={`/posts/${_id}`} className='btn-post'>
                  <i className='fa fa-share-square-o' aria-hidden='true'></i>{" "}
                  <p style={{ marginLeft: "3px" }}>Share</p>
                </Link>

                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={c => deletePost(_id)}
                    type='button'
                    className='btn btn-danger'
                  >
                    <i className='fas fa-times'></i>
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
