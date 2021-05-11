import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.9:9090/api/v1/',
  });

  export default axiosInstance;