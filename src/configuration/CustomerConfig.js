const ParentConfig = require("./ParentConfig");

module.exports = {
  AddBooking: ParentConfig.ParentUrl + "api/User/AddBooking",
  GetBooking: ParentConfig.ParentUrl + "api/User/GetBooking",
  UpdateBooking: ParentConfig.ParentUrl + "api/User/UpdateBooking",
  DeleteBooking:
    ParentConfig.ParentUrl + "api/User/DeleteBooking?BookingID=",
};
