import axios from "axios";

const api = axios.create({
 baseURL: process.env.VUE_APP_URL,
});

const dadosUsuarioLogado = JSON.parse(localStorage.getItem("dadosUsuarioLogado"));

api.interceptors.request.use(
    (config) => {
      config.headers.authkey = "f4f49fd6deed76678e60";
      
      // config.headers["acess-token"] = dadosUsuarioLogado.accessToken ?? ""
      // config.headers.client = dadosUsuarioLogado?.client ?? ""
      // config.headers.uid = dadosUsuarioLogado?.uid ?? ""
   
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
   );
   

export default api