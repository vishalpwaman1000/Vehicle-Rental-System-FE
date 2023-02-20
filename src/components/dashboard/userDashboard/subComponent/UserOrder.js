import React from "react";
import "./UserOrder.scss";
import CustomerService from "../../../../services/CustomerService";
import AdminService from "../../../../services/AdminService";

import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

const customerService = new CustomerService();
const adminService = new AdminService();

export default function UserOrder() {
  const [OpenLoader, setOpenLoader] = React.useState(false);
  const [TotalPages, setTotalPages] = React.useState(0);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [Open, setOpen] = React.useState(false);
  const [List, setList] = React.useState([]);
  const [SnackBar, setSnackBar] = React.useState({
    openSnackBar: false,
    snackBarMessage: "",
  });

  React.useEffect(() => {
    GetBooking(PageNumber);
    const interval = setInterval(() => {
      GetBooking(PageNumber);
    },5*1000);
    return () => clearInterval(interval);
  }, []);

  const GetBooking = (CurrentNumber) => {
    let Data = {
      UserID: localStorage.getItem("CUSTOMER_ID"),
      PageNumber: CurrentNumber,
      RecordPerPage: 10,
    };
    customerService
      .GetBooking(Data)
      .then((data) => {
        // debugger;
        setList([]);
        console.log("GetBooking Data : ", data);
        if (data?.data.isSuccess) {
          setList(data?.data.data);
          setTotalPages(data?.data.TotalPage);
        } else {
          console.warn("GetBooking Message : ", data?.data.message);
        }
      })
      .catch((error) => {
        console.error("GetBooking Error : ", error);
      });
  };

  const handleUpdateStatus = (Order_ID) => {
    let data = {
      orderID: Order_ID,
      status: "canceled",
    };

    adminService
      .UpdateOrderStatus(data)
      .then((data) => {
        setSnackBar({
          ...SnackBar,
          openSnackBar: true,
          snackBarMessage: data?.data.message,
        });
      })
      .catch((error) => {
        console.error("GetOrderDetails Error : ", error);
      });
  };

  const handleCancelOrder = (BookingID, Order_Status) => {
    adminService
      .UpdateBookingStatus(BookingID, Order_Status)
      .then((data) => {
        console.log("UpdateBookingStatus Data : ", data);
        setSnackBar({
          ...SnackBar,
          openSnackBar: true,
          snackBarMessage: data?.data.message,
        });
        GetBooking(PageNumber);
      })
      .catch((error) => {
        console.error("UpdateBookingStatus Error : ", error);
        setSnackBar({
          ...SnackBar,
          openSnackBar: true,
          snackBarMessage: "Something Went Wrong",
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...SnackBar, openSnackBar: false });
  };

  const handlePaging = () => {};

  return (
    <div className="userOrder-Container w-100 h-100">
      <div className="userOrder-SubContainer w-100 p-2">
        <table class="table table-hover">
          <thead>
            <tr className="table-dark">
              <th>Booking ID</th>
              <th>Image</th>
              <th>Vehicle Name</th>
              <th>vehicle Number</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Distance</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(List) && List.length > 0 ? (
              List.map(function (data, index) {
                if (data.status !== "Bill") {
                  return (
                    <tr>
                      <td>{data.bookingID}</td>
                      <td>
                        <img
                          src={data.imageUrl}
                          alt="Image"
                          class="w-25 h-25"
                        />
                      </td>
                      <td>{data.vehicleName}</td>
                      <td>{data.vehicleNumber}</td>
                      <td>{data.source}</td>
                      <td>{data.destination}</td>
                      <td>{data.totalDistance}</td>
                      <td>{data.totalPrice}</td>
                      <td
                        class={
                          data.status === "accept"
                            ? "text-success fw-semibold"
                            : data.status === "reject"
                            ? "text-danger fw-semibold"
                            : "text-dark fw-semibold"
                        }
                      >
                        {data.status}
                      </td>
                      <td>
                        {data.status === "pending" ||
                        data.status !== "cancel" ? (
                          <a
                            class="btn btn-outline-dark  mx-3 w-50 fw-semibold"
                            onClick={() => {
                              handleCancelOrder(data.bookingID, "cancel");
                            }}
                          >
                            Cancel
                          </a>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  );
                }
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="userOrder-Footer w-100 border d-flex justify-content-center align-items-center">
        <Pagination
          count={TotalPages}
          Page={PageNumber}
          onChange={handlePaging}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>

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
