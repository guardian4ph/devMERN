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
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='post-profile' src={`/img/${profilepic}`} alt='...' />

        <h4>{name}</h4>
      </Link>
    </div>
    <div style={{ border: "1px solid #ddd", borderRadius: "5px" }}>
      <p className='post-date '>
        {" "}
        Posted on <Moment format='LLLL'>{date}</Moment>
      </p>
      <p className='m-1 '>{text}</p>
      <div style={{ background: "#eee", padding: "8px 8px" }}>
        <Link to={`/posts/${_id}/${articleImage}`}>
          <img
            // style={{ width: "305px", borderRadius: "5px" }}
            style={{
              width: "305px",
              margin: "auto",
              display: "flex",
              borderRadius: "5px",
            }}
            src={`/img/${articleImage}`}
            alt='...'
          />
        </Link>
      </div>

      <div className='line'></div>
      {showActions && (
        <Fragment>
          {/* Button for like */}
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={c => addLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i> {""}Like
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>

            {/* Button for Unlike */}
            <button
              onClick={c => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
              {""}
              Unlike
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Comments{" "}
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
          </div>
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
