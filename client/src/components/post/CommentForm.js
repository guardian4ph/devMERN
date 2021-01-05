import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

//id in prop is the postid from actions
const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={c => {
          c.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Leave Comment'
          value={text}
          onChange={c => setText(c.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.object.isRequired,
};

export default connect(null, { addComment })(CommentForm);
