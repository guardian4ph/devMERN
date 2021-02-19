import React, { Fragment } from "react";
import sLogo from "../../img/sLogo.png";
import { Link } from "react-router-dom";

const logo = props => (
  <Fragment>
    <Link to='/'>
      <div className='Logo'>
        <img src={sLogo} alt='GUARDIAN' />
        {/* <p className='Htitle'> GUARDIAN</p> */}
      </div>
    </Link>
  </Fragment>
);
export default logo;
