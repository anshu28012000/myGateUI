import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AddTenant from "./AddTenant";
export default class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton: false,
    };
  }
  onAddClick() {
    this.setState({ addButton: true });
  }
  onCancelClick() {
    this.setState({ addButton: false });
  }
  render() {
    return (
      <div className="button-container">
        {" "}
        {this.state.addButton === false && (
          <div>
            <button
              onClick={() => this.onAddClick()}
              className="button-primary"
            >
              Add Tenant{" "}
            </button>{" "}
            <NavLink
              to="/
                    "
            >
              {" "}
              <button className="button-secondary"> Back </button>{" "}
            </NavLink>{" "}
          </div>
        )}{" "}
        {this.state.addButton === true && (
          <div className="form-div-container">
            {" "}
            <AddTenant> </AddTenant>{" "}
            <button
              onClick={() => this.onCancelClick()}
              className="button-secondary-cancel"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>
    );
  }
}
