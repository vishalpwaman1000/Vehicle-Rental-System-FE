import CustomerConfig from "./../configuration/CustomerConfig";
import AxiosServices from "./AxiosServices";

const axiosService = new AxiosServices();

export default class CustomerService {
  //, , ,
  AddBooking(data) {
    console.log("AddBooking : " + CustomerConfig.AddBooking);
    return axiosService.post(CustomerConfig.AddBooking, data, false);
  }

  GetBooking(data) {
    console.log("GetBooking : " + CustomerConfig.GetBooking);
    return axiosService.get(
      CustomerConfig.GetBooking +
        "?UserID=" +
        data.UserID +
        "&PageNumber=" +
        data.PageNumber +
        "&RecordPerPage=" +
        data.RecordPerPage,
      false
    );
  }

  UpdateBooking(data) {
    console.log("UpdateBooking : " + CustomerConfig.UpdateBooking);
    return axiosService.put(CustomerConfig.UpdateBooking, data, false);
  }

  DeleteBooking(data) {
    console.log("DeleteBooking : " + CustomerConfig.DeleteBooking + data);
    return axiosService.delete(
      CustomerConfig.DeleteBooking + data,
      false
    );
  }
}
