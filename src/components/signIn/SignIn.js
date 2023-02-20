import React, { Component } from "react";
import "./SignIn.scss";

import AuthenticationServices from "./../../services/AuthenticationServices";

import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const authenticationService = new AuthenticationServices();

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      role: "Customer",

      userNameFlag: false,
      passwordFlag: false,

      openSnackBar: false,
      snackBarMessage: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name : ", name, " Value : ", value);
    this.setState({ [name]: value });
  };

  handleChangeRole = (value) => {
    console.log(" Value : ", value);
    this.setState({ role: value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackBar: false });
  };

  handleSignIn = () => {
    // debugger;
    this.setState({
      userNameFlag: false,
      passwordFlag: false,
    });

    let Required = false;
    if (this.state.userName === "") {
      Required = true;
      this.setState({ userNameFlag: true });
    }
    if (this.state.password === "") {
      Required = true;
      this.setState({ passwordFlag: true });
    }

    if (Required) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please Enter Required Field.",
      });

      return;
    }

    let data = {
      userName: this.state.userName,
      password: this.state.password,
    };

    authenticationService
      .SignIn(data)
      .then((data) => {
        console.log("SignIn Data : ", data);
        debugger;
        if (data?.data.isSuccess) {
          if (data?.data.data.role.toLocaleUpperCase() === "CUSTOMER") {
            localStorage.setItem("CUSTOMER_TOKEN", data?.data.data.token);
            localStorage.setItem("CUSTOMER_ID", data?.data.data.userID);
            localStorage.setItem("CUSTOMER_NAME", data?.data.data.userName);
            localStorage.setItem("userHome", "true");
            localStorage.setItem("userOrder", "false");
            window.location.href = "/UserDashboard";
          } else {
            localStorage.setItem("ADMIN_TOKEN", data?.data.data.token);
            localStorage.setItem("ADMIN_ID", data?.data.data.userID);
            localStorage.setItem("adminHome", "true");
            localStorage.setItem("adminOrder", "false");
            localStorage.setItem("adminHistory", "false");
            localStorage.setItem("adminFeedback", "false");
            localStorage.setItem("adminUser", "false");
            window.location.href = "/AdminDashboard";
          }

          this.setState({
            userName: "",
            password: "",
            confirmPassword: "",
            masterPassword: "",
            role: "Customer",

            userNameFlag: false,
            passwordFlag: false,
            masterPasswordFlag: false,
          });
        }
        this.setState({
          openSnackBar: true,
          snackBarMessage: data?.data.message,
        });
      })
      .catch((error) => {
        debugger;
        console.log("SignUp Error : ", error);
        this.setState({
          openSnackBar: true,
          snackBarMessage: "Something Went Wrong",
        });
      });
  };

  handleSignUp = () => {
    window.location.href = "/SignUp";
  };
  render() {
    return (
      <div className="signIn-Container w-100 h-100">
        <div className="signIn-SubContainer w-100 h-100">
          {/* <div className="signIn-SubContainer-Header w-100 border">
            <h4 className="text-start ps-3">Vehicle Rental Services</h4>
          </div> */}
          <div className="signIn-SubContainer-Body w-100">
            <div className="signIn-SubContainer-Body-Box1 h-75 border p-5 bg-white">
              <div className="signIn-SubContainer-Body-Box1-Header">
                <h4 className="text-start">Vehicle Rental Services</h4>
                <div className="text-start text-primary fw-semibold fs-5">
                  Log In
                </div>
              </div>
              <div className="signIn-SubContainer-Body-Box1-Body pt-5">
                <div class="mb-4 text-start">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="UserName@example.com"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                  />
                  <div class="form-text">
                    Please Enter UserName and EmailID.
                  </div>
                </div>
                <div class="mb-3 text-start">
                  <label for="exampleFormControlInput1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div class="form-text">Please Enter Password</div>
                </div>
              </div>
              <div className="signIn-SubContainer-Body-Box1-Footer w-100 d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-link fw-semibold"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    this.handleSignUp();
                  }}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    this.handleSignIn();
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.snackBarMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
