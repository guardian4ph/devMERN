import React from "react";
import Logo from "../logo/logo";

function NotFound() {
  return (
    <div className='page-not'>
      <div></div>
      <div></div>
      <Logo />
      <h1 className='large text-primary text-center'>
        <i className='fas fa-exclamatory-triangle'></i> Page Not Found
      </h1>
      <p className=' text-center'> Sorry, page does not exist</p>
    </div>
  );
}

export default NotFound;
