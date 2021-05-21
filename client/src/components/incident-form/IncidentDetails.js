import React from "react";
import { connect } from "react-redux";

const CreateIncident = props => {
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

          <div className='form-group'>
            <select
              name='type'
              value={type}
              onChange={c => onChange(c)}
              required
            >
              <option value='0'>* Type</option>
              <option value='Gov'>Government</option>
              <option value='Vol'>Volunteer Group</option>
              <option value='Pri'>Private Org.</option>
            </select>
            <small className='form-text'>
              Choose the Operation Center type
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIncident);
