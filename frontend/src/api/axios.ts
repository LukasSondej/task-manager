import axios from "axios";
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});
instance.interceptors.request.use(function (config) {
if(localStorage.getItem("accessToken")){
    config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken")
}
    return config;
  }, function (error) {
    return Promise.reject(error);
  },
);

export default instance