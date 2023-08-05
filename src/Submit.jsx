import React from "react";
import "./index.css"
const Submit = () => {
  return (
   <>
      <header className="site-header" id="header">
        <h1 className="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
        <p>Your Response has been Submitted</p>
      </header>

      <div className="main-content">
        <i className="fa fa-check main-content__checkmark" id="checkmark"></i>
      </div></>

  );
};

export default Submit;
