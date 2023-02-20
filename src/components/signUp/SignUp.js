import React, { Component } from "react";
import "./SignUp.scss";

import AuthenticationServices from "./../../services/AuthenticationServices";

import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const authenticationService = new AuthenticationServices();

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      masterPassword: "",
      role: "Customer",

      userNameFlag: false,
      passwordFlag: false,
      confirmPasswordFlag: false,
      masterPasswordFlag: false,

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

  handleSignUp = () => {
    debugger;
    this.setState({
      userNameFlag: false,
      passwordFlag: false,
      masterPasswordFlag: false,
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
    if (this.state.confirmPassword === "") {
      Required = true;
      this.setState({ confirmPasswordFlag: true });
    }

    if (this.state.confirmPassword !== this.state.password) {
      Required = true;
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password And Confirm Password Not Match.",
      });
    }

    if (
      this.state.role.toLocaleUpperCase() === "ADMIN" &&
      this.state.masterPassword === ""
    ) {
      Required = true;
      this.setState({ masterPasswordFlag: true });
    }

    if (Required) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please Enter Required Field.",
      });

      return;
    }

    if (
      this.state.role.toLocaleUpperCase() === "ADMIN" &&
      this.state.masterPassword !== "India@123"
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Invalid Master Password.",
      });

      return;
    }

    let data = {
      userName: this.state.userName,
      password: this.state.password,
      role: this.state.role.toLocaleUpperCase() === "ADMIN" ? 0 : 1,
    };

    authenticationService
      .SignUp(data)
      .then((data) => {
        console.log("SignUp Data : ", data);
        if (data?.data.isSuccess) {
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
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("SignUp Error : ", error);
        this.setState({
          openSnackBar: true,
          snackBarMessage: "Something Went Wrong",
        });
      });
  };

  handleSignIn = () => {
    window.location.href = "/";
  };

  render() {
    return (
      <div className="signUp-Container w-100 h-100">
        <div className="signUp-SubContainer w-100 h-100">
          {/* <div className="signUp-SubContainer-Header w-100 border">
            <h4 className="text-start ps-3">Vehicle Rental Services</h4>
          </div> */}
          <div className="signUp-SubContainer-Body w-100 p-5 ">
            <div className="signUp-SubContainer-Body-Box1 h-auto border p-5 bg-white">
              <div className="signUp-SubContainer-Body-Box1-Header">
                <h4 className="text-start">Vehicle Rental Services</h4>
                <div className="text-start text-primary fw-semibold fs-5">
                  Sign Up
                </div>
              </div>
              <div className="signUp-SubContainer-Body-Box1-Body pt-3">
                <div className="mb-3 text-start">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    UserName & Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="UserName@gmail.com"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                  />
                  <div
                    className="form-text"
                    style={this.state.userNameFlag ? { color: "red" } : {}}
                  >
                    Please Enter UserName and EmailID.
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div
                    className="form-text"
                    style={this.state.passwordFlag ? { color: "red" } : {}}
                  >
                    Please Enter Password
                  </div>
                </div>
                <div class="mb-3 text-start">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                  <div
                    className="form-text"
                    style={
                      this.state.confirmPasswordFlag ? { color: "red" } : {}
                    }
                  >
                    Please Enter Confirm Password
                  </div>
                </div>
                {this.state.role === "ADMIN" ? (
                  <div className="mb-3 text-start">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Master Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      name="masterPassword"
                      value={this.state.masterPassword}
                      onChange={this.handleChange}
                    />
                    <div
                      className="form-text"
                      style={
                        this.state.masterPasswordFlag ? { color: "red" } : {}
                      }
                    >
                      Please Enter Master Password
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="mb-3 text-start d-flex">
                  <div className="form-check me-5">
                    <input
                      checked={
                        this.state.role.toLocaleLowerCase() === "admin"
                          ? true
                          : false
                      }
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="role"
                      value={this.state.role}
                      onClick={() => {
                        this.handleChangeRole("ADMIN");
                      }}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Admin
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      checked={
                        this.state.role.toLocaleLowerCase() === "customer"
                          ? true
                          : false
                      }
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="role"
                      value={this.state.role}
                      onClick={() => {
                        this.handleChangeRole("CUSTOMER");
                      }}
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Customer
                    </label>
                  </div>
                </div>
              </div>
              <div className="signUp-SubContainer-Body-Box1-Footer w-100 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-link fw-semibold"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    this.handleSignIn();
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    this.handleSignUp();
                  }}
                >
                  Sign Up
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
