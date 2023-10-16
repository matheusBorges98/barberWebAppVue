import api from "../http/index"

export default async function authentication(dados) {
  let { login, senha, subdominio } = dados
  
  let dadosRetorno = {};

  try {
    let isAuth = false;

  //   const usuario =  {
  //     email: "pablo@inspire.com@sandbox.com.br",
  //     password: "@Pablo2000",
  //     subdomain: "inspire"
  //  }

  const usuario =  {
    email: "pablo@inspire.com",
    password: "@Pablo2000",
    subdomain: "sandbox"
 }

    // const usuario =  {
    //     email: login,
    //     password: senha,
    //     subdomain: subdominio
    // }

    const response = await api({
      method: 'post',
      url:  `/auth/sign_in?key_transform_camel_lower=true`,
      data: {
        ...usuario
      }
    });

    if (response && response.data.user) {
      isAuth = true;
    };

    let { uid, client, expiry  } = response.headers;
    let accessToken = response.headers['access-token']
    let { data : detalhesUsuarioLogado } = response;

    dadosRetorno = {
      isAuth,
      uid,
      accessToken,
      client,
      expiry,
      ...detalhesUsuarioLogado
    }

    return dadosRetorno;

  } catch (error) {
    console.error(`Ocorreu um erro ao realizar o login: ${error}`);
    return false;
  }
}
