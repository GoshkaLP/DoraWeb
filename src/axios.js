import axios from "axios";

// function getToken() {
//     return "Bearer " + localStorage.getItem("token");
// }
//
// axios.defaults.baseURL = "https://dora.gmrybkin.com"
// axios.defaults.headers.common['Authorization'] = getToken();


const axiosInstance = axios.create({
    baseURL: "https://dora.gmrybkin.com",
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
});

export default axiosInstance;
