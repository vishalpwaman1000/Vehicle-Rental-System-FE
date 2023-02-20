import React from "react";
import "./AdminOrder.scss";
import CustomerService from "../../../../services/CustomerService";
import AdminService from "../../../../services/AdminService";
import Pagination from "@material-ui/lab/Pagination";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const customerService = new CustomerService();
const adminService = new AdminService();

export default function AdminOrder() {
  const [OpenLoader, setOpenLoader] = React.useState(false);
  const [TotalPages, setTotalPages] = React.useState(0);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [List, setList] = React.useState([]);
  const [Open, setOpen] = React.useState(false);
  const [SnackBar, setSnackBar] = React.useState({
    openSnackBar: false,
    snackBarMessage: "",
  });
  const [Data, setData] = React.useState({
    Status: "",
    OrderID: 0,
  });
  React.useEffect(() => {
    GetAllBooking(PageNumber);
    const interval = setInterval(() => {
      GetAllBooking(PageNumber);
    },5*1000);
    return () => clearInterval(interval);

  }, []);

  const GetAllBooking = (CurrentNumber) => {
    let Data = {
      PageNumber: CurrentNumber,
      RecordPerPage: 10,
    };
    adminService
      .GetAllBooking(Data)
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
  const handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    setPageNumber(value);
    // GetStockDetails(value);
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
        GetAllBooking(PageNumber);
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

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...SnackBar, openSnackBar: false });
  };

  return (
    <div className="adminOrder-Container w-100 h-100">
      <div className="adminOrder-SubContainer w-100 p-3">
        <table class="table table-hover">
          <thead>
            <tr className="table-dark">
              <th>Booking ID</th>
              <th>Image</th>
              <th>Vehicle Name</th>
              <th>vehicle Number</th>
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
                        data.status === "reject" ? (
                          <a
                            class="btn btn-success  mx-3 fw-semibold"
                            onClick={() => {
                              handleCancelOrder(data.bookingID, "accept");
                            }}
                          >
                            Accept
                          </a>
                        ) : (
                          <></>
                        )}
                        {data.status === "pending" ||
                        data.status === "accept" ? (
                          <a
                            class="btn btn-danger  mx-3 fw-semibold"
                            onClick={() => {
                              handleCancelOrder(data.bookingID, "reject");
                            }}
                          >
                            Reject
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
      <div className="adminOrder-Footer w-100 border d-flex justify-content-center align-items-center">
        <Pagination
          count={TotalPages}
          Page={PageNumber}
          onChange={handlePaging}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
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
