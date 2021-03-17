import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getProfiles } from "../../actions/profile";

const Posts = ({ getProfiles, getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getProfiles();
    getPosts();
  }, [getPosts, getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <h1 className='large text-primary'>Posts</h1> */}
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to GUARDIAN community
      </p>
      <PostForm />
      <div>
        {posts.map(post => (
          <div className='posts'>
            <PostItem key={post._id} post={post} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts);
