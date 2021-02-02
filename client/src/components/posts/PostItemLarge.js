import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    articleImage,
    avatar,
    profilepic,
    user,
    likes,
    comments,
    date,
  },
  showActions,
}) => (
  <div className='full-screen'>
    <div>
      <div>
        <Link to={`/posts/${_id}/${articleImage}`}>
          <img
            style={{ width: "100%", borderRadius: "5px" }}
            src={`/img/${articleImage}`}
            alt='...'
          />
        </Link>
      </div>
      <div>
        {" "}
        <div>
          <Link to={`/profile/${user}`}>
            {profilepic === undefined || profilepic === null ? (
              <img
                className='post-profile'
                src={`/img/Spotter.png`}
                alt='...'
              />
            ) : (
              <img
                className='post-profile'
                src={`/img/${profilepic}`}
                alt='...'
              />
            )}

            <h4>{name}</h4>
          </Link>
        </div>
      </div>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        {" "}
        Posted on <Moment format='LLLL'>{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          {/* Button for like */}
          <button
            onClick={c => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up'></i>{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>

          {/* Button for Unlike */}
          <button
            onClick={c => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{" "}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
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
);
//console.log(PostItem);
// set show action to true so buttons would not show in single post
PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
