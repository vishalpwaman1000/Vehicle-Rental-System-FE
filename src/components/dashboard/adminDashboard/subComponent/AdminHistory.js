import React from "react";
import "./AdminHistory.scss";
import CustomerService from "../../../../services/CustomerService";
import AdminService from "../../../../services/AdminService";
import Pagination from "@material-ui/lab/Pagination";

const customerService = new CustomerService();
const adminService = new AdminService();
export default function AdminHistory() {
  const [TotalPages, setTotalPages] = React.useState(0);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [List, setList] = React.useState([]);

  React.useEffect(() => {
    GetOrderDetails(PageNumber);
    const interval = setInterval(() => {
      GetOrderDetails(PageNumber);
    },5*1000);
    return () => clearInterval(interval);
  }, []);

  const GetOrderDetails = (CurrentNumber) => {
    let Data = {
      PageNumber: CurrentNumber,
      RecordPerPage: 10,
    };
    adminService
      .GetAllOrderDetails(Data)
      .then((data) => {
        // debugger;
        setList([]);
        console.log("GetAllOrderDetails Data : ", data);
        if (data?.data.isSuccess) {
          setList(data?.data.data);
        } else {
          console.warn("GetAllOrderDetails Message : ", data?.data.message);
        }
      })
      .catch((error) => {
        console.error("GetOrderDetails Error : ", error);
      });
  };

  const handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    setPageNumber(value);
    // GetStockDetails(value);
  };
  return (
    <div className="adminHistory-Container w-100 h-100">
      <div className="adminHistory-SubContainer w-100 p-5">
        <table class="table table-hover">
          <thead>
            <tr className="table-dark">
              <th>Order ID</th>
              <th>Table ID</th>
              <th>UserName</th>
              <th>MenuID</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(List) && List.length > 0 ? (
              List.map(function (data, index) {
                // if(data.)
                return (
                  <tr>
                    <td>{data.Id}</td>
                    <td>{data.tableID}</td>
                    <td>{data.userName}</td>
                    <td>{data.menuID}</td>
                    <td>{data.status}</td>
                    <td>
                      <a class="btn btn-outline-dark mx-3 w-50 text-dark fw-semibold">
                        Cancel Order
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
      <div className="adminHistory-Footer w-100 border d-flex justify-content-center align-items-center">
        <Pagination
          count={TotalPages}
          Page={PageNumber}
          onChange={handlePaging}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
    </div>
  );
  // return (
  //   <div className="adminHistory-Container w-100 h-100">
  //     <div className="adminHistory-SubContainer p-5 w-100">
  //     </div>
  //   </div>
  // );
}
