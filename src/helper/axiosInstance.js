import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://estorefashionshop.herokuapp.com/api/v1/',
  });

  export default axiosInstance;