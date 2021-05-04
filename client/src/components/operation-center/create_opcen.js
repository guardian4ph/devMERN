import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerOpcen } from "../../actions/opcen";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { accessrigths } from "../../actions/auth";

const Create_opcen = ({
  opcen: { type, loading, opcen },
  setAlert,
  registerOpcen,
  isAuthenticated,
  accessrigths,
  user,
}) => {
  // console.log("Opcen Id", opcen._id);
  //Use state hooks
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  //destructure so you would do formData.name formData.number
  //Object Syntax use {}
  const { name, category, description } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const rigths = "opcen admin";

  const onSubmit = async c => {
    c.preventDefault();
    registerOpcen({ user, name, category, description, type });
    accessrigths({ rigths });
  };
  if (isAuthenticated && opcen !== null) {
    return <Redirect to={`/operation-center/${user._id}/${opcen._id}`} />;
  }
  //   return <Redirect to={`/operation-center`} />;
  // }

  return loading && (user._id == null) & (opcen !== null) ? (
    <Spinner />
  ) : (
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
            <option value='Emergency Management'>Emergency Management</option>
            <option value='First Responders'>First Responders</option>
            <option value='Law Enforcement'>Law Enforcement</option>
            <option value='Transporation'>
              Transportation Security Administration
            </option>
          </select>
          <small className='form-text'>
            Choose a category that describes what type of services your
            operation center can cater.
          </small>

          <div className='form-group'>
            <textarea
              placeholder='Tell us about your operation center'
              name='description'
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

  opcen: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,

  opcen: state.opcen,
});

export default connect(mapStateToProps, {
  registerOpcen,
  setAlert,
  accessrigths,
})(Create_opcen);
