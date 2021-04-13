import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerOpcen } from "../../actions/opcen";
import PropTypes from "prop-types";

const Create_opcen = ({ setAlert, registerOpcen, isAuthenticated, auth }) => {
  //Use state hooks
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  //destructure so you would do formData.name formData.number
  //Object Syntax use {}
  const { name, category, description } = formData;
  let id = auth._id;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    registerOpcen({ id, name, category, description });
  };
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Fragment>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          margin: "1rem",
        }}
      >
        <h1 className='large text-primary'>Create a Operation Center</h1>
        <p className='lead'>
          <i className='fa fa-building-o'></i> Operation Center Information
        </p>
        <form className='form' onSubmit={c => onSubmit(c)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Operation Center Name (required) '
              name='name'
              //value is set value on state for onChange
              value={name}
              onChange={c => onChange(c)}
              required
            />
            <small className='form-text'>
              Use the name of your organization .
            </small>
          </div>

          <select
            name='category'
            value={category}
            onChange={c => onChange(c)}
            required
          >
            <option value='0'>Pubic Safety Category (required)</option>
            <option value='Male'>Emergency Management</option>
            <option value='Female'>First Responders</option>
            <option value='LGBT'>Law Enforcement</option>
            <option value='LGBT'>Transportation Security Administration</option>
          </select>
          <small className='form-text'>
            Choose a category that describes what type of services your
            operation center can cater.
          </small>

          <div className='form-group'>
            <textarea
              placeholder='Tell us a little about your operation center'
              name='descriptiom'
              value={description}
              onChange={c => onChange(c)}
              rows='6'
            ></textarea>
            <small className='form-text'>
              You can add more details like contact details, address, images
              after you create your operation center.
            </small>
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Create Operation Center'
          />
        </form>
      </div>
    </Fragment>
  );
};

Create_opcen.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerOpcen: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { registerOpcen, setAlert })(
  Create_opcen
);
