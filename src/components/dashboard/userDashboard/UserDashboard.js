import React, { Component } from "react";
import UserHome from "./subComponent/UserHome";
import UserOrder from "./subComponent/UserOrder";
import "./UserDashboard.scss";

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openHome: true,
      openOrder: false,
    };
  }

  componentDidMount() {
    debugger;
    if (localStorage.getItem("userHome") === "true") {
      this.setState({ openHome: true, openHistory: false, openOrder: false });
    } else if (localStorage.getItem("userOrder") === "true") {
      this.setState({ openHome: false, openHistory: false, openOrder: true });
    }
  }

  handleNav = (nav) => {
    if (nav === "home") {
      this.setState({ openHome: true, openHistory: false, openOrder: false });
      localStorage.setItem("userHome", "true");
      localStorage.setItem("userOrder", "false");
    } else if (nav === "order") {
      this.setState({ openHome: false, openHistory: false, openOrder: true });
      localStorage.setItem("userHome", "false");
      localStorage.setItem("userOrder", "true");
    }
  };

  handleSignOut = () => {
    localStorage.removeItem("CUSTOMER_TOKEN");
    localStorage.removeItem("CUSTOMER_ID");
    localStorage.removeItem("userHome");
    localStorage.removeItem("userOrder");
    window.location.href = "/";
  };

  render() {
    return (
      <div className="userDashboard-Container w-100 h-100">
        <div className="userDashboard-SubContainer w-100 h-100">
          <div className="userDashboard-Header w-100 p-2 d-flex justify-content-between bg-primary">
            <h4 className="text-start">Vehicle Rental Services</h4>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.handleSignOut();
              }}
            >
              Sign Out
            </button>
          </div>
          <div className="userDashboard-Body d-flex w-100">
            <div className="NavBar h-100 border-end" style={{ width: "20%" }}>
              <div
                className={this.state.openHome ? "NavSelected" : "Nav"}
                onClick={() => {
                  this.handleNav("home");
                }}
              >
                Home
              </div>
              <div
                className={this.state.openOrder ? "NavSelected" : "Nav"}
                onClick={() => {
                  this.handleNav("order");
                }}
              >
                Order
              </div>
             
            </div>
            <div className="h-100" style={{ width: "80%" }}>
              {this.state.openHome ? <UserHome /> : <></>}
              {this.state.openOrder ? <UserOrder /> : <></>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
