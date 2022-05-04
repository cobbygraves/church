import React from "react";
import "./NavigationItem.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <div className="NavigationItem">
      <NavLink to={props.link} exact={props.exact}>
        {/* <span>{props.children}</span> */}
        <p>
          {props.children}
          {props.name}
        </p>
      </NavLink>
    </div>
  );
};

export default NavigationItem;
