import React, { Component } from "react";
import "./AdminDashboard.scss";
import AdminHome from "./subComponent/AdminHome";
import AdminOrder from "./subComponent/AdminOrder";
import AdminHistory from "./subComponent/AdminHistory";
import AdminUser from "./subComponent/AdminUser";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openHome: true,
      openUser: false,
      openHistory: false,
      openOrder: false,
    };
  }

  componentDidMount() {
    // debugger;
    if (localStorage.getItem("adminHome") === "true") {
      this.setState({
        openHome: true,
        openUser: false,
        openHistory: false,
        openOrder: false,
      });
    } else if (localStorage.getItem("adminUser") === "true") {
      this.setState({
        openHome: false,
        openUser: true,
        openHistory: false,
        openOrder: false,
      });
    } else if (localStorage.getItem("adminOrder") === "true") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: false,
        openOrder: true,
      });
    } else if (localStorage.getItem("adminHistory") === "true") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: true,
        openOrder: false,
      });
    } else if (localStorage.getItem("adminFeedback") === "true") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: false,
        openOrder: false,
      });
    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    localStorage.removeItem("ADMIN_ID");
    localStorage.removeItem("adminHome");
    localStorage.removeItem("adminOrder");
    localStorage.removeItem("adminHistory");
    localStorage.removeItem("adminUser");
    window.location.href = "/";
  };

  handleNav = (nav) => {
    if (nav === "home") {
      this.setState({
        openHome: true,
        openUser: false,
        openHistory: false,
        openOrder: false,
      });
      localStorage.setItem("adminHome", "true");
      localStorage.setItem("adminOrder", "false");
      localStorage.setItem("adminHistory", "false");
      localStorage.setItem("adminUser", "false");
    } else if (nav === "stock") {
      this.setState({
        openHome: false,
        openUser: true,
        openHistory: false,
        openOrder: false,
      });
      localStorage.setItem("adminHome", "false");
      localStorage.setItem("adminOrder", "false");
      localStorage.setItem("adminHistory", "false");
      localStorage.setItem("adminUser", "true");
    } else if (nav === "order") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: false,
        openOrder: true,
      });
      localStorage.setItem("adminHome", "false");
      localStorage.setItem("adminOrder", "true");
      localStorage.setItem("adminHistory", "false");
      localStorage.setItem("adminUser", "false");
    } else if (nav === "history") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: true,
        openOrder: false,
      });
      localStorage.setItem("adminHome", "false");
      localStorage.setItem("adminOrder", "false");
      localStorage.setItem("adminHistory", "true");
      localStorage.setItem("adminUser", "false");
    } else if (nav === "feedback") {
      this.setState({
        openHome: false,
        openUser: false,
        openHistory: false,
        openOrder: false,
      });
      localStorage.setItem("adminHome", "false");
      localStorage.setItem("adminOrder", "false");
      localStorage.setItem("adminHistory", "false");
      localStorage.setItem("adminUser", "false");
    }
  };

  render() {
    return (
      <div className="adminDashboard-Container w-100 h-100">
        <div className="adminDashboard-SubContainer w-100 h-100">
          <div className="adminDashboard-Header w-100 p-2 d-flex justify-content-between border">
            <h4 className="text-start text-dark">Vehicle Rental Services</h4>

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
          <div className="adminDashboard-Body d-flex w-100">
            <div className="NavBar h-100 border-end" style={{ width: "16%" }}>
              <div
                className={this.state.openHome ? "NavSelected" : "Nav"}
                onClick={() => {
                  this.handleNav("home");
                }}
              >
                Home
              </div>
              <div
                className={this.state.openUser ? "NavSelected" : "Nav"}
                onClick={() => {
                  this.handleNav("stock");
                }}
              >
                Graph
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
            <div className="h-100" style={{ width: "84%" }}>
              {this.state.openHome ? <AdminHome /> : <></>}
              {this.state.openUser ? <AdminUser /> : <></>}
              {this.state.openOrder ? <AdminOrder /> : <></>}
              {this.state.openHistory ? <AdminHistory /> : <></>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
