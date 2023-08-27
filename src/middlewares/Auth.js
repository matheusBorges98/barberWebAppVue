import axios from "axios";

export default function checkAuth(login, senha) {
  try{
    let isAuthenticated = false;

    let usuario = {
      email     : login,
      password  : senha,
      base_url: "http://146.190.45.189"
    };

    // {email: "admin@gearhead.com.br",
    // password: "@4Gearhead2022"};

    console.log(usuario)

    axios.post(`http://146.190.45.189/auth/sign_in`,
    { ...usuario }, 
    {
      headers: {
        'Content-Type':'application/json',
        'authkey': 'b800ee0b3027bb6732130ceba67d0438'
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