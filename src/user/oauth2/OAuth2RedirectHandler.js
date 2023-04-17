import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:8084/auth/google";

const OAuth2RedirectHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const jwt = searchParams.get("token").toString();
  console.log(jwt);
  const response = axios
    .post(
      API_URL,
      { jwt: jwt },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate('/profile');
      window.location.reload();
    });
};
export default OAuth2RedirectHandler;
