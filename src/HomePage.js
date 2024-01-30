import React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      notificationVisible: false,
      role: "Security",
      disableButton: false,
    };
  }
  componentDidMount() {
    // Fetch data from localhost:8080/getAllData
    fetch("http://localhost:8080/getData")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        this.setState({ tableData: data });
        console.log(this.state.tableData);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any error cases here
      });
  }

  handleInputChange = (event, id) => {
    const { value } = event.target;
    const updatedTableData = this.state.tableData.map((item) =>
      item.id === id ? { ...item, comments: value } : item
    );
    this.setState({ tableData: updatedTableData });
  };

  handleButtonClick = async (houseNumber, id) => {
    const updatedTableData = this.state.tableData.map((item) =>
      item.col1 === houseNumber ? { ...item, comments: "" } : item
    );
    this.setState(
      {
        tableData: updatedTableData,
        notificationVisible: true,
        disableButton: true,
      },
      () => {
        setTimeout(() => {
          this.setState({ notificationVisible: false, disableButton: false });
        }, 3000); // Hides the notification after 2 seconds
      }
    );
    const findDataByHouseNumber = () => {
      for (var i = 0; i < this.state.tableData.length; i++) {
        if (this.state.tableData[i].house === houseNumber) {
          return this.state.tableData[i];
        }
      }
      return null; // Return null if no data matches the house number
    };

    const apiData = findDataByHouseNumber();
    console.log(("apiData", apiData));
    const idData = apiData.id;
    const house = apiData.house;
    const phoneNumber = apiData.phoneNumber;
    const comments = apiData.comments;
    try {
      const response = await fetch("http://localhost:8080/sendSMS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: phoneNumber + "," + comments,
      });
      if (response.ok) {
        console.log("Notification sent successfully");
        // Handle the success response here
      } else {
        console.error("Failed to send notification");
        // Handle any error cases here
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          {" "}
          {this.state.notificationVisible && (
            <div className="notification"> Notification Sent </div>
          )}{" "}
          {this.state.role === "Security" && (
            <table className="table-container">
              <thead>
                <tr>
                  <th> House Number </th> <th> Phone Number</th>{" "}
                  <th> Message </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {this.state.tableData.map((rowData) => (
                  <tr key={rowData.id}>
                    <td> {rowData.house} </td> <td> {rowData.phoneNumber} </td>{" "}
                    <td>
                      <input
                        type="text"
                        value={rowData.comments}
                        onChange={(event) =>
                          this.handleInputChange(event, rowData.id)
                        }
                      />{" "}
                      <button
                        onClick={() =>
                          this.handleButtonClick(rowData.house, rowData.id)
                        }
                        disabled={this.state.disableButton}
                      >
                        Send Notification{" "}
                      </button>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>
          )}{" "}
          {this.state.role === "Tenant" && (
            <div> Tenants Not Allowed to Access!! </div>
          )}{" "}
        </div>{" "}
      </div>
    );
  }
}
export default HomePage;
