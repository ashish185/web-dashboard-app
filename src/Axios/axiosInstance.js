import axios from "axios";

/* const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 
        'auth-token': '19c4ff12-e027-4320-b844-2cda768714e8',
        'content-type': 'application/json'
    }
}); */
/* FireBase */
const axiosInstance = axios.create({
 // baseURL:"https://web-dashboard-lead-management-default-rtdb.firebaseio.com/"
  baseURL:process.env.REACT_APP_API_URL,

  });
 
export default axiosInstance;