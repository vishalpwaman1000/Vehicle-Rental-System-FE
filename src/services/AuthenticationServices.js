import AuthenticationConfig from "./../configuration/AuthenticationConfig";
import AxiosServices from "./AxiosServices";

const axiosService = new AxiosServices();

export default class AuthenticationServices {
  SignIn(data) {
    console.log("CreateInformation : " + AuthenticationConfig.SignIn);
    return axiosService.post(AuthenticationConfig.SignIn, data, false);
  }

  SignUp(data) {
    console.log("ReadInformation : " + AuthenticationConfig.SignUp);
    return axiosService.post(AuthenticationConfig.SignUp, data, false);
  }
}
