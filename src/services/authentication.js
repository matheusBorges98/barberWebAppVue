import api from "../http/index"

export default async function authentication(login, senha) {
  console.log(login, senha);

  try {
    let isAuthenticated = false;

    const usuario =  {
      email: "admin@b-systems.com.br",
      password: "#Senha123",
      base_url: "http://143.198.70.219"
   }

    const response = await api({
      method: 'post',
      url:  `/auth/sign_in?key_transform_camel_lower=true`,
      data: {
        ...usuario
      }
    });
    
    console.log(response, "response")
    if (response && response.data.user) {
      isAuthenticated = true;
    }
    console.log(isAuthenticated)
    return isAuthenticated;

  } catch (error) {
    console.error(`Ocorreu um erro ao realizar o login: ${error}`);
    return false;
  }
}
