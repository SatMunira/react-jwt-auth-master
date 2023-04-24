import axios from "axios";

const API_URL = "http://localhost:8084/api/auth/";


class AuthService {
  async login(username, password) {
    console.log("login")
    const response = await axios
      .post(API_URL + "signin", { 
        username,
        password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    console.log('aksdn')
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
