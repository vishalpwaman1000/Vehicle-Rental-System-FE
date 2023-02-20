import React from "react";
import "./AdminHome.scss";
import Logo from "../../../../asserts/img.png";
import DefaultLogo from "./../../../../asserts/vada-pav.webp";

import AdminService from "../../../../services/AdminService";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import { Search } from "@material-ui/icons";

const adminServices = new AdminService();

export default function AdminHome() {
  const [IsUpdate, setIsUpdate] = React.useState(false);
  const [Image, setImage] = React.useState(Logo);
  const [List, setList] = React.useState([]);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [StockList, setStockList] = React.useState([]);
  const [SnackBar, setSnackBar] = React.useState({
    OpenSnackBar: false,
    snackBarMessage: "",
  });
  const [OpenLoader, setOpenLoader] = React.useState(false);
  const [Data, setData] = React.useState({
    Image: new FormData(),
    VehicleID: 0,
    VehicleName: "",
    VehicleDescription: "",
    VehicleNumber: "",
    Price: 0,
    IsActive: true,
    ImageUrl: "",
  });

  React.useEffect(() => {
    GetVehicle(1);
  }, []);

  const GetVehicle = (CurrentNumber) => {
    let Data = {
      PageNumber: CurrentNumber,
      RecordPerPage: 100000,
    };
    adminServices
      .GetVehicle(Data)
      .then((data) => {
        // debugger;
        setList([]);
        console.log("GetVehicle Data : ", data);
        if (data?.data.isSuccess) {
          setList(data?.data.data);
        } else {
          console.warn("GetVehicle Message : ", data?.data.message);
        }
      })
      .catch((error) => {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name : ", name, " Value : ", value);
    setData({ ...Data, [name]: value });
    console.log("Data : ", Data);
  };

  const handleCapture = (event) => {
    // debugger;
    console.log("Image : ", event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setData({ ...Data, Image: event.target.files[0] });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({
      ...SnackBar,
      OpenSnackBar: false,
      snackBarMessage: "",
    });
  };

  const AddVehicle = () => {
    debugger;

    console.log("Insert Data : ", Data);

    if (
      Data.VehicleName === "" ||
      Data.VehicleName === undefined ||
      Data.VehicleDescription === "" ||
      Data.VehicleDescription === undefined ||
      Data.VehicleNumber === "" ||
      Data.VehicleNumber === undefined ||
      Data.Price <= 0
    ) {
      setSnackBar({
        ...SnackBar,
        OpenSnackBar: true,
        snackBarMessage: "Please Enter Required Field",
      });
      return;
    }

    // debugger;
    setOpenLoader(true);
    const data = new FormData();
    data.append("file", Data.Image);
    data.append("VehicleName", Data.VehicleName);
    data.append("VehicleNumber", Data.VehicleNumber);
    data.append("VehicleDescription", Data.VehicleDescription);
    data.append("price", Number(Data.Price));
    adminServices
      .AddVehicle(data)
      .then((data) => {
        debugger;
        console.log("AddVehicles Data : ", data);
        setOpenLoader(false);
        if (data?.data.isSuccess) {
          setData({
            ...Data,
            Image: new FormData(),
            VehicleID: 0,
            VehicleName: "",
            VehicleDescription: "",
            VehicleNumber: "",
            Price: 0,
            ImageUrl: "",
            IsActive: true,
          });
        }
        setSnackBar({
          ...SnackBar,
          OpenSnackBar: true,
          snackBarMessage: data?.data.message,
        });
        GetVehicle(PageNumber);
      })
      .catch((error) => {
        console.error("AddVehicles Error : ", error);
        setOpenLoader(false);
        setSnackBar({
          ...SnackBar,
          OpenSnackBar: true,
          snackBarMessage: "Something went wrong",
        });
      });
  };

  const UpdateMenuDetail = () => {
    debugger;

    console.log("Insert Data : ", Data);

    if (
      Data.VehicleName === "" ||
      Data.VehicleName === undefined ||
      Data.VehicleDescription === "" ||
      Data.VehicleDescription === undefined ||
      Data.VehicleNumber === "" ||
      Data.VehicleNumber === undefined ||
      Data.Price <= 0
    ) {
      setSnackBar({
        ...SnackBar,
        OpenSnackBar: true,
        snackBarMessage: "Please Enter Required Field",
      });
      return;
    }

    debugger;
    setOpenLoader(true);

    let data = {
      vehicleID: Data.VehicleID,
      vehicleName: Data.VehicleName,
      vehicleDescription: Data.vehicleDescription,
      price: Data.Price,
      imageUrl: Data.ImageUrl,
    };

    adminServices
      .UpdateVehicle(data)
      .then((data) => {
        console.log("UpdateVehicle Data : ", data);
        setOpenLoader(false);
        setSnackBar({
          ...SnackBar,
          OpenSnackBar: true,
          snackBarMessage: data?.data.message,
        });
        setData({
          ...Data,
          Image: new FormData(),
          VehicleID: 0,
          VehicleName: "",
          VehicleDescription: "",
          VehicleNumber: "",
          Price: 0,
          ImageUrl: "",
          IsActive: true,
        });
        setIsUpdate(false);
        GetVehicle(PageNumber);
      })
      .catch((error) => {
        console.error("UpdateVehicle Error : ", error);
        setOpenLoader(false);
        setSnackBar({
          ...SnackBar,
          OpenSnackBar: true,
          snackBarMessage: "Something went wrong",
        });
      });
  };

  const handleEdit = (data) => {
    debugger;
    setData({
      ...Data,
      VehicleID: data.vehicleID,
      VehicleName: data.vehicleName,
      VehicleDescription: data.vehicleDescription,
      VehicleNumber: data.vehicleNumber,
      Price: data.price,
      IsActive: true,
      ImageUrl: data.imageUrl,
    });
    setIsUpdate(true);
  };

  const handleDelete = (VehicleID) => {
    adminServices
      .DeleteVehicle(VehicleID)
      .then((data) => {
        console.log("DeleteVehicle : ", data);
        GetVehicle(PageNumber);
      })
      .catch((error) => {
        console.error("DeleteVehicle Error : ", error);
      });
  };

  const handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    setPageNumber(value);
    // GetStockDetails(value);
  };

  const handleClear = () => {
    setIsUpdate(false);
    setData({
      ...Data,
      Image: new FormData(),
      VehicleID: 0,
      VehicleName: "",
      VehicleDescription: "",
      VehicleNumber: "",
      Price: 0,
      ImageUrl: "",
      IsActive: true,
    });
  };

  return (
    <div className="adminHome-Container h-100">
      <div className="adminHome-SubContainer w-100 h-100">
        <div className="adminHome-Body d-flex w-100">
          <div className="adminHome-Grid h-100 p-3">
            <table class="table table-hover">
              <thead>
                <tr className="table-dark">
                  <th>ID</th>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Price/Km</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(List) && List.length > 0 ? (
                  List.map(function (data, index) {
                    return (
                      <tr>
                        <td>{data.vehicleID}</td>
                        <td>
                          <img
                            src={data.imageUrl}
                            alt="BikeImage"
                            class="w-25 h-25"
                          />
                        </td>
                        <td>{data.vehicleName}</td>
                        <td>{data.vehicleNumber}</td>
                        <td>{data.price}</td>
                        <td>
                          <a
                            class="btn btn-outline-danger mx-3"
                            onClick={() => {
                              handleEdit(data);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                          </a>
                          <a
                            class="btn btn-outline-dark"
                            onClick={() => {
                              handleDelete(data.vehicleID);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-x-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          <div className="adminHome-Input border-left h-100 p-4">
            <div className="mb-4 text-start">
              {!IsUpdate ? (
                <>
                  <label className="form-label" htmlFor="customFile">
                    Select Menu Image
                  </label>
                  <input
                    accept="image/*"
                    // style={{ display: "none" }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleCapture}
                  />
                </>
              ) : (
                <div className="mb-4 text-start">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Emter Image Url
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="ImageUrl"
                    value={Data.ImageUrl}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Vehicle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="VehicleName"
                value={Data.VehicleName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="VehicleNumber"
                value={Data.VehicleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Vehicle Description
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="VehicleDescription"
                value={Data.VehicleDescription}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Price Per Km
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                name="Price"
                value={Data.Price}
                onChange={handleChange}
              />
            </div>

            {/* <select
              className="form-select mb-4"
              aria-label="Default select example"
              name="MenuSubType"
              value={Data.MenuSubType}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="starter">Starter</option>
              <option value="maincourse">MainCourse</option>
              <option value="beverages">beverages</option>
              <option value="desert">desert</option>
            </select> */}

            <div className="w-100 mt-3">
              {!IsUpdate ? (
                <>
                  <a
                    className="btn btn-primary mx-3 w-75"
                    onClick={() => {
                      AddVehicle();
                    }}
                  >
                    Add
                  </a>
                </>
              ) : (
                <div className="d-flex">
                  <a
                    className="btn btn-primary me-3 w-50"
                    onClick={() => {
                      UpdateMenuDetail();
                    }}
                  >
                    Update
                  </a>
                  <a
                    className="btn btn-light w-50"
                    onClick={() => {
                      handleClear();
                    }}
                  >
                    Clear
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Backdrop style={{ zIndex: "1", color: "#fff" }} open={OpenLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={SnackBar.OpenSnackBar}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        message={SnackBar.snackBarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
