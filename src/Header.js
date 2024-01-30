import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div class="navbar">
        <NavLink to="/"> Home </NavLink>{" "}
        <div class="navbar-links">
          <NavLink to="/tenant"> Tenant </NavLink>{" "}
          <NavLink
            to="/
            "
          >
            {" "}
            Security{" "}
          </NavLink>{" "}
        </div>{" "}
        <div class="navbutton">
          {" "}
          <button class="signin"> Sign In </button>{" "}
        </div>{" "}
      </div>
    );
  }
}
