import axios from "axios";

export default function checkAuth(login, senha) {
  try{
    let isAuthenticated = false;

    let usuario = {
      email     : login,
      password  : senha
    };

    // {email: "admin@gearhead.com.br",
    // password: "@4Gearhead2022"};

    console.log(usuario)

    axios.post(`http://localhost:8080/auth/sign_in`,
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