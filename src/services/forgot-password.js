/**import axios from "axios";
const API_URL = "http://localhost:8084/forgot_password";

function ForgotPassword(email) {
  
    const response = axios
      .post(
        API_URL + "/getEmail",
        { email: email },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
    .then((response) => {
       return response.data;
    });
    return response
  }

export default ForgotPassword;*/

