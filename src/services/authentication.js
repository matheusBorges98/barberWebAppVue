import axios from "axios";

export default async function authentication(login, senha) {
    console.log(login, senha)
  try{
    let isAuthenticated = false;

    let usuario = 
    {
      "email": "admin@b-systems.com.br",
      "password": "#Senha123",
      "base_url": "http://146.190.45.189"
   }
    // {
    //   email     : login,
    //   password  : senha,
    //   base_url: "http://146.190.45.189"
    // };

    axios.post(`http://146.190.45.189/auth/sign_in?key_transform_camel_lower=true`,
    { ...usuario }, 
    {
      headers: {
        'Content-Type':'application/json',
        'authkey': 'f4f49fd6deed76678e60'
      }
  
    }).then((response) => {
      console.log(response)
      if(response.data && response.data.token.token){
        isAuthenticated = true
      }

      return isAuthenticated
    });
  }catch(e){
    console.error(`Ocorreu um erro ao realizar o login: ${e}` )
  }


}