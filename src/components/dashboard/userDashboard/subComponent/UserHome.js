import React from "react";
import "./UserHome.scss";
import AdminService from "../../../../services/AdminService";
import CustomerService from "../../../../services/CustomerService";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const adminServices = new AdminService();
const customerService = new CustomerService();

const MobileRegex = RegExp(/^[0-9]{10}$/i);

export default function UserHome() {
  const [List, setList] = React.useState([]);
  const [IsUpdate, setIsUpdate] = React.useState(false);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [SnackBar, setSnackBar] = React.useState({
    openSnackBar: false,
    snackBarMessage: "",
  });
  const [Open, setOpen] = React.useState(false);
  const [OpenLoader, setOpenLoader] = React.useState(false);
  const [IsSubmit, SetIsSubmit] = React.useState(false);
  const [Data, setData] = React.useState({
    BookingID: 0,
    InsertionDate: "",
    UserID: 0,
    VehicleID: 0,
    VehicleName: "",
    VehicleNumber: "",
    VehicleDescription: "",
    PricePerKm: 0,
    ImageUrl: "",
    CustomerName: "",
    MobileNumber: "",
    Source: "",
    Destination: "",
    TotalPrice: 0,
    TotalDistance: "",
    Status: "pending",
  });

  const [DataFlag, setDataFlag] = React.useState({
    CustomerNameFlag: false,
    MobileNumberFlag: false,
    SourceFlag: false,
    DestinationFlag: false,
    TotalDistanceFlag: false,
  });

  React.useEffect(() => {
    GetVehicle(1);
    const interval = setInterval(() => {
      GetVehicle(1);
    },5*1000);
    return () => clearInterval(interval);
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

  const handleClose = () => {
    setOpen(false);
    setDataFlag({ ...DataFlag, UserNameFlag: false, MobileNumberFlag: false });
    setData({
      ...Data,
      UserName: "",
      MobileNumber: 0,
      MenuName: "",
      MenuDescription: "",
      Price: 0,
      StockName_2: "",
      MenuSubType: "",
      IsActive: false,
      StockName_3: "",
      StockQuantity_3: 0,
      MenuType: "",
      StockQuantity_1: 0,
      StockQuantity_2: 0,
      ImageUrl: "",
      StockName_1: "",
      MenuId: 0,
    });
    setOpenLoader(false);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log("Data : ", name, " Value : ", value);

    if (name === "MobileNumber") {
      if (!MobileRegex.test(value)) {
        setDataFlag({ MobileNumberFlag: true });
      } else {
        setDataFlag({ MobileNumberFlag: false });
      }
    }

    if (name === "TotalDistance") {
      debugger;
      let Prices = Data.PricePerKm * Number(value);
      setData({
        ...Data,
        TotalPrice: Prices,
        TotalDistance: value,
      });
    } else {
      setData({ ...Data, [name]: value });
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...SnackBar, openSnackBar: false });
  };

  const handleBooking = (data) => {
    debugger;
    setData({
      ...Data,
      VehicleID: data.vehicleID,
      VehicleName: data.vehicleName,
      VehicleDescription: data.vehicleDescription,
      VehicleNumber: data.vehicleNumber,
      PricePerKm: data.price,
      IsActive: true,
      ImageUrl: data.imageUrl,
    });
    setOpen(true);
  };

  const AddBooking = () => {
    debugger;
    SetIsSubmit(false);
    if (
      Data.CustomerName === "" ||
      Data.CustomerName === undefined ||
      Data.MobileNumber === "" ||
      Data.MobileNumber === undefined ||
      Data.Source === "" ||
      Data.Destination === "" ||
      Data.TotalDistance === ""
    ) {
      setSnackBar({
        ...SnackBar,
        openSnackBar: true,
        snackBarMessage: "Please Enter Required Field.",
      });
      SetIsSubmit(true);
      return;
    }
    let data = {
      userID: localStorage.getItem("CUSTOMER_ID"),
      customerName: Data.CustomerName,
      mobileNumber: Data.MobileNumber,
      source: Data.Source,
      destination: Data.Destination,
      totalPrice: Data.TotalPrice,
      totalDistance: Data.TotalDistance,
      status: Data.Status,
      vehicleID: Data.VehicleID,
      vehicleName: Data.VehicleName,
      vehicleNumber: Data.VehicleNumber,
      vehicleDescription: Data.VehicleDescription,
      pricePerKm: Data.PricePerKm,
      imageUrl: Data.ImageUrl,
    };

    customerService
      .AddBooking(data)
      .then((data) => {
        console.log("AddBooking Data : ", data);
        setOpen(false);
        setData({
          ...Data,
          BookingID: 0,
          InsertionDate: "",
          UserID: 0,
          VehicleID: 0,
          VehicleName: "",
          VehicleNumber: "",
          VehicleDescription: "",
          PricePerKm: 0,
          ImageUrl: "",
          CustomerName: "",
          MobileNumber: "",
          Source: "",
          Destination: "",
          TotalPrice: 0,
          TotalDistance: "",
          Status: "pending",
        });
        setSnackBar({
          ...SnackBar,
          openSnackBar: true,
          snackBarMessage: data?.data.message,
        });
      })
      .catch((error) => {
        console.error("AddBooking Error : ", error);
      });
  };

  return (
    <div className="userHome-Container w-100 h-100">
      <div className="customer-Order-List w-100 p-3">
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
                          handleBooking(data);
                        }}
                      >
                        Book
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

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={Open}
        // open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Open}>
          {
            <div
              style={{
                backgroundColor: "white",
                boxShadow: "5",
                padding: "2px 4px 3px",
                width: "auto",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                border: "none",
              }}
              className="p-5"
            >
              <div className="w-100">
                <div
                  className="card w-100 mb-3"
                  style={{ border: "0px solid white" }}
                >
                  <div
                    className="card-body d-flex border-none w-100"
                    style={{ border: "0px solid white" }}
                  >
                    <img src={Data.ImageUrl} alt="" className="h-100 w-25" />
                    <div className="h-100 w-75">
                      <h5 className="card-title text-center">
                        Vehicle Name : {Data.VehicleName}
                      </h5>
                      <p className="card-Info text-center">
                        Vehicle Description :{" "}
                        {Data.VehicleDescription === "" ||
                        Data.VehicleDescription === null
                          ? "NA"
                          : Data.VehicleDescription}
                      </p>
                      <p className="card-Info fw-semibold text-center">
                        Price Per Km :&nbsp;{Data.PricePerKm}&nbsp;&#8377;
                      </p>
                      <div className="d-flex justify-content-center align-items-center my-2">
                        <p className="card-Info me-3">
                          Vehicle Number : {Data.VehicleNumber}
                        </p>
                      </div>
                      <div>
                        <p className="card-Info me-3 d-flex justify-content-center align-items-center fw-semibold text-primary">
                          Total Price : {Data.TotalPrice}&nbsp;&#8377;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-100 d-flex justify-content-center">
                  <div
                    className="Input-Field m-5"
                    style={{ margin: "20px 0 10px 0" }}
                  >
                    <label className="mb-2">Customer Name</label>
                    <TextField
                      error={
                        IsSubmit && Data.CustomerName === "" ? true : false
                      }
                      id="outlined-multiline-static"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="CustomerName"
                      size="small"
                      value={Data.CustomerName}
                      onChange={handleChanges}
                    />
                  </div>
                  <div
                    className="Input-Field m-5"
                    style={{ margin: "20px 0 10px 0" }}
                  >
                    <label className="mb-2">Mobile Number</label>
                    <TextField
                      error={
                        (IsSubmit && Data.MobileNumber === "") ||
                        Data.MobileNumber === "0"
                          ? true
                          : false
                      }
                      id="outlined-multiline-static"
                      type="number"
                      fullWidth
                      variant="outlined"
                      name="MobileNumber"
                      size="small"
                      value={Data.MobileNumber}
                      onChange={handleChanges}
                    />
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                  <div className="Input-Field" style={{ width: 200 }}>
                    <label className="mb-2">Source</label>
                    <TextField
                      error={IsSubmit && Data.Source === "" ? true : false}
                      id="outlined-multiline-static"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="Source"
                      size="small"
                      value={Data.Source}
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="Input-Field mx-5" style={{ width: 200 }}>
                    <label className="mb-2">Destination</label>
                    <TextField
                      error={IsSubmit && Data.Destination === "" ? true : false}
                      id="outlined-multiline-static"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="Destination"
                      size="small"
                      value={Data.Destination}
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="Input-Field" style={{ width: 100 }}>
                    <label className="mb-2">Total Distance</label>
                    <TextField
                      error={
                        IsSubmit && Data.TotalDistance === "" ? true : false
                      }
                      id="outlined-multiline-static"
                      type="number"
                      fullWidth
                      variant="outlined"
                      name="TotalDistance"
                      size="small"
                      value={Data.TotalDistance}
                      onChange={handleChanges}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", margin: "40px 0 0 0" }}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ margin: "10px 10px 0 0", width: "200px" }}
                  onClick={() => {
                    AddBooking();
                  }}
                >
                  Book
                </Button>
                <Button
                  variant="outlined"
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleClose}
                >
                  Cancle
                </Button>
              </div>
            </div>
          }
        </Fade>
      </Modal>

      <Backdrop
        style={{ zIndex: "1", color: "#fff" }}
        open={OpenLoader}
        onClick={() => {
          handleClose();
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={SnackBar.openSnackBar}
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
