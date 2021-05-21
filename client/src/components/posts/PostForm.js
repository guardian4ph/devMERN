import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { send } from "../../utils/push";
// import io from "socket.io-client";

const PostForm = ({ addPost }) => {
  //const [text, setText] = useState("");
  const [formData, setFormData] = useState({
    text: "",
    articleImage: "",
  });

  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);

  // console.log(socket);
  // // useEffect(() => {
  // //   socket?.on("welcome", m => {
  // //     console.log("Socket Server", m);
  // //   });
  // // }, [socket]);

  const { text } = formData;
  const onFileChange = c => {
    setImage(c.target.files[0]);
    setImageName(c.target.files[0].name);
  };

  const onChange = c => {
    setFormData({ ...formData, [c.target.name]: c.target.value });
  };

  const payload = new FormData();
  payload.append("text", text);
  payload.append("articleImage", image);

  const onSubmit = c => {
    c.preventDefault();
    addPost(payload);
    setFormData({ text: "", articleImage: "" });
    setImageName("");
    send("GUARDIAN NOTIFICATION", `${text}`);
  };

  //

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        encType='multipart/form-data'
        onSubmit={c => onSubmit(c)}
      >
        <textarea
          name='text'
          cols='30'
          rows='2'
          placeholder='Send quick a notification to all users under your opcen'
          value={text}
          onChange={c => onChange(c)}
          required
        ></textarea>

        {/* add image button here */}
        <div>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
          {/* <label htmlFor='file'> */}
          <span style={{ fontSize: "14px" }}> Upload Photo </span>
          <input
            className='btn btn-dark my-1'
            type='file'
            onChange={c => onFileChange(c)}
            accept='image/*,video/mp4,video/x-m4v,video/*'
            single
            placeholder={imageName}
          />
          {/* </label> */}
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
