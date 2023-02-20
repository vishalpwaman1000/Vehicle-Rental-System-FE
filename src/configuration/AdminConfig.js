const ParentConfig = require("./ParentConfig");

module.exports = {
  AddVehicle: ParentConfig.ParentUrl + "api/Admin/AddVehicle",
  UpdateVehicle: ParentConfig.ParentUrl + "api/Admin/UpdateVehicle",
  GetVehicle: ParentConfig.ParentUrl + "api/Admin/GetVehicle",
  DeleteVehicle: ParentConfig.ParentUrl + "api/Admin/DeleteVehicle",
  GetAllBooking: ParentConfig.ParentUrl + "api/Admin/GetAllBooking",
  UpdateBookingStatus: ParentConfig.ParentUrl + "api/Admin/UpdateBookingStatus",
  GetGraph: ParentConfig.ParentUrl + "api/Admin/GetGraph",
};
