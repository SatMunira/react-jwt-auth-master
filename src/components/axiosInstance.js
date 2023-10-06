import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      // Handle the error or redirect to the error page
      window.location.href = '/error'; // Redirect to the error page
    } else {
      // Some other error occurred
      // Handle the error or redirect to the error page
      window.location.href = '/error'; // Redirect to the error page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
