import AdminConfig from "../configuration/AdminConfig";
import AxiosServices from "./AxiosServices";

const axiosService = new AxiosServices();

export default class AdminService {
  //InsertMenuDetails, GetMenuDetails, UpdateMenuDetails, DeleteMenuDetails, GetMenuRecord, UpdateActiveMenuStatus, UpdateOrderStatus
  AddVehicle(data) {
    console.log("AddVehicle : " + AdminConfig.AddVehicle);
    return axiosService.post(AdminConfig.AddVehicle, data, false);
  }

  GetVehicle(data) {
    console.log("GetVehicle : " + AdminConfig.GetVehicle);
    return axiosService.get(
      AdminConfig.GetVehicle +
        "?PageNumber=" +
        data.PageNumber +
        "&RecordPerPage=" +
        data.RecordPerPage,
      false
    );
  }

  UpdateVehicle(data) {
    console.log("UpdateVehicle : " + AdminConfig.UpdateVehicle);
    return axiosService.put(AdminConfig.UpdateVehicle, data, false);
  }

  DeleteVehicle(data) {
    console.log("DeleteVehicle : " + AdminConfig.DeleteVehicle);
    return axiosService.delete(
      AdminConfig.DeleteVehicle + "?VehicleID=" + data,
      false
    );
  }

  GetAllBooking(data) {
    console.log("GetAllBooking : " + AdminConfig.GetAllBooking);
    return axiosService.get(
      AdminConfig.GetAllBooking +
        "?PageNumber=" +
        data.PageNumber +
        "&RecordPerPage=" +
        data.RecordPerPage,
      false
    );
  }

  UpdateBookingStatus(BookingID, Status) {
    console.log("GetAllBooking : " + AdminConfig.UpdateBookingStatus);
    return axiosService.patch(
      AdminConfig.UpdateBookingStatus +
        "?BookingID=" +
        BookingID +
        "&Status=" +
        Status,
      false
    );
  }

  GetGraph() {
    console.log("GetGraph : " + AdminConfig.GetGraph);
    return axiosService.get(AdminConfig.GetGraph, false);
  }
}
