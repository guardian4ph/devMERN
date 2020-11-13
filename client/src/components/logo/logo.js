import React, { Fragment } from "react";
import gLogo from "../../img/hd.png";
import { Link } from "react-router-dom";

const logo = props => (
  <Fragment>
    <Link to='/'>
      <div className='Logo'>
        <img src={gLogo} alt='GUARDIAN' />
        {/* <p className='Htitle'> GUARDIAN</p> */}
      </div>
    </Link>
  </Fragment>
);
export default logo;
