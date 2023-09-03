import axios from "axios";

const api = axios.create({
 baseURL: "http://143.198.70.219",
});

api.interceptors.request.use(
    (config) => {
      config.headers.authkey = "f4f49fd6deed76678e60";
   
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
   );
   

export default api