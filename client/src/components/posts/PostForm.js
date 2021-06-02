import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { send } from "../../utils/push";
import { getOpcenProfileById } from "../../actions/opcenprofile";
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

  // useEffect(() => {
  //   getOpcenProfileById(_id);
  // });

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
    setImageName(" ");
    // send("GUARDIAN NOTIFICATION", `${text}`);
  };

  //

  return (
    <div
      className='comment bg-white'
      style={{ margin: "0px 10px 0px 10px", padding: "0" }}
    >
      <h1 className='large text-primary m-1'> Quick Notification</h1>

      <form
        className='form my-1'
        encType='multipart/form-data'
        onSubmit={c => onSubmit(c)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: " 2fr .5fr",
            gridGap: "5px",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            margin: "5px",
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='2'
            placeholder='Message'
            value={text}
            onChange={c => onChange(c)}
            required
          ></textarea>
          <div>
            {/* <label htmlFor='file'> */}
            <input
              type='submit'
              className='btn btn-dark my-1'
              style={{ width: "100%", margin: "auto" }}
              value='Send'
            />

            {/* </label> */}
          </div>
          <input
            className='btn btn-dark my-1'
            type='file'
            onChange={c => onFileChange(c)}
            accept='image/*,video/mp4,video/x-m4v,video/*'
            single
            placeholder={imageName}
          />
        </div>

        {/* add image button here */}
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // opcen_id: state.opcen.opcen._id,
});

export default connect(mapStateToProps, { addPost })(PostForm);
