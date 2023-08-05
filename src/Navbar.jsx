import React from "react";
import { Link} from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link><Link className="navbar-brand" to="/forms">
Forms
</Link>
        
      </div>
    </nav>
  );
};
Navbar.defaultProps = {
  title: "FormBuilder",
};
export default Navbar;
