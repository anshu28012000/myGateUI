import React, { Component } from "react";

export default class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {
        id: "",
        house: "",
        phoneNumber: "",
      },
      notificationVisible: false,
    };
  }
  onSubmitClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.inputValues),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        // Reset form after successful submission if needed
        this.setState({
          inputValues: {
            id: "",
            house: "",
            phoneNumber: "",
          },
        });
      } else {
        console.error("Error submitting data:", response.status);
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  onChangeId(event) {
    const { value } = event.target;
    this.setState((prevState) => ({
      inputValues: { ...prevState.inputValues, id: value },
    }));
  }

  onChangeHouse(event) {
    const { value } = event.target;
    this.setState((prevState) => ({
      inputValues: { ...prevState.inputValues, house: value },
    }));
  }

  onChangePhone(event) {
    const { value } = event.target;
    this.setState((prevState) => ({
      inputValues: { ...prevState.inputValues, phoneNumber: value },
    }));
  }

  render() {
    return (
      <div className="form-container">
        {" "}
        {this.state.notificationVisible && (
          <div className="notification">
            {" "}
            Tenant Details Added successfully{" "}
          </div>
        )}{" "}
        <h1> Add Tenant Details </h1>{" "}
        <form>
          <div className="form-group">
            <label> Id: </label>{" "}
            <input
              onChange={(event) => this.onChangeId(event)}
              type="text"
              value={this.state.inputValues.id}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <label> House Number: </label>{" "}
            <input
              onChange={(event) => this.onChangeHouse(event)}
              type="text"
              value={this.state.inputValues.house}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <label> Phone Number: </label>{" "}
            <input
              onChange={(event) => this.onChangePhone(event)}
              type="text"
              value={this.state.inputValues.phoneNumber}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <button
              onClick={(event) => this.onSubmitClick(event)}
              className="button-submit"
            >
              {" "}
              Submit{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>
    );
  }
}
