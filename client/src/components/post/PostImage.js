import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getimagePost } from "../../actions/post";
import PostItemLarge from "../../components/posts/PostItemLarge";
import CommentItem from "../../components/post/CommentItem";
import CommentForm from "../../components/post/CommentForm";

const ImagePost = ({ auth, getimagePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getimagePost(match.params.id, match.params.articleImage);
  }, [getimagePost, match.params.id, match.params.articleImage]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className=''>
        <PostItemLarge post={post} />

        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </div>
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
