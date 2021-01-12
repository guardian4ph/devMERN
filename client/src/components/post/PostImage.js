import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getimagePost } from "../../actions/post";
import PostItem from "../../components/posts/PostItem";

const ImagePost = ({ auth, getimagePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getimagePost(match.params.id, match.params.articleImage);
  }, [getimagePost, match.params.id, match.params.articleImage]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItem post={post} />
      <div className='posts'>
        {/* <img src={`/img/${articleImage}`} alt='...' /> */}
      </div>
      <h1 className='large'>Test</h1>
    </Fragment>
  );
};

ImagePost.propTypes = {
  getimagePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getimagePost })(ImagePost);
