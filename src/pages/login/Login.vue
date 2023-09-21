<template>
  <b-row :class="'justify-content-md-end fundo-login'">
    <Card
      colSM="12"
      colMD="5"
      colLG="4"
      colXL="3"
      :alignRight="true"
      containerSlotStyle="top: 5vh; position: relative;"
      containerSlotClass="text-center"
      transitionName="slide-right"
    >
      <b-col>
        <b-img-lazy
          :rounded="true"
          :src="require('../../assets/mb-solucoes.png')"
          :width="150"
          :height="150"
          :blank="true"
        >
        </b-img-lazy>
      </b-col>

      <b-col
        class="text-center"
        v-for="input in inputs"
        v-bind:key="input.model"
      >
        <CustomInput
          class="text-center"
          :label="input.label"
          :placeholder="input.placeholder"
          :isMultiselect="input.isMultiselect"
          :multiselectOptions="input.multiselectOptions"
          :type="input.type"
          :formatter="input.formatter"
          v-model="input.model"
          :valid="null"
          :id="input.id"
          v-on:changeValue="onChildUpdate"
        />
      </b-col>
      <b-col cols="12" style="margin-top: 5vh">
        <b-row class="text-center" style="align-content: space-between">
          <b-col cols="6">
            <b-button variant="outline-primary" class="col-12" v-on:click="enviarFormulario()">
              Criar conta
              <b-icon icon="person-plus"></b-icon>
            </b-button>
          </b-col>
           <b-col cols="6">
            <b-button variant="outline-primary" class="col-12" v-on:click="enviarFormulario()">
              Entrar
              <b-icon icon="arrow-bar-right"></b-icon>
            </b-button>
          </b-col>

          <b-col v-if="tipoLogin == 1" cols="12" class="mt-4">
            <b-button variant="outline-primary" class="col-12" v-on:click="mudarTipoLogin(2)">
              Entrar sem cadastro
              <b-icon icon="key-fill"></b-icon>
            </b-button>
          </b-col>
          <b-col v-if="tipoLogin == 2" cols="12" class="mt-4">
            <b-button variant="outline-primary" class="col-12" v-on:click="mudarTipoLogin(1)">
              Acessar conta
              <!-- <b-icon icon="key-fill"></b-icon> -->
            </b-button>
          </b-col>
          <b-col v-if="tipoLogin == 1" cols="12" class="mt-4">
            <b-button variant="outline-secondary" class="col-12" v-on:click="enviarFormulario()">
              Esqueci minha senha
              <!-- <b-icon icon="key-fill"></b-icon> -->
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </Card>
  </b-row>
</template>

<script>
/* eslint-disable */

import Authentication from "../../services/authentication";

import Mixin from '../../core/Mixin';
import api from "../../http/index"

export default {
  components: {},
  mixins: [Mixin],
  data: function () {
    return {
      tipoLogin: 1,
      user: [],
      inputs: [],
    };
  },
  mounted(){
    this.deleteItemFromLocalStorage("dadosUsuarioLogado");
    this.obterInputs(this.tipoLogin);
    this.obterInformacoesSubdominio();
  },
  methods: {

    obterInformacoesSubdominio(){
      console.log(this.$route.query.subdominio, "subd");
      api({
        method: 'get',
        url:  `/list_accounts`,
        params: {
         subdominio:`${this.$route.query.subdominio}`
        }
      }).then((response)=>{
        console.log(response, "RES LOGIN")        
      });
    },

    mudarTipoLogin(novoModo){
      this.tipoLogin = novoModo;
      this.obterInputs(novoModo);
    },
    
    obterInputs(modo){
      /*
        modo : 
          1 : Login completo
          2 : Login simplificado

          To do: 
            Criar requisicao que busque os inputs desta tela.
      */

     let retorno;
     
     if(modo == 1){
      retorno = [
        {
          id:"login",
          label: "Login",
          model: "login",
          placeholder: "Digite seu nome",
        },
        {
          id:"password",
          label: "Senha",
          model: "password",
          placeholder: "Digite sua senha",
        },
      ]
     }else if(modo == 2){
      retorno = [
        {
          id:"name",
          label: "Nome",
          model: "name",
          placeholder: "Digite seu nome",
        },
        {
          id:"contact",
          label: "celular",
          model: "contact",
          inputType:"number",
          placeholder: "Digite seu celular",
        },
      ]
     };

     this.inputs = retorno;
    },

    async enviarFormulario() {
      let formulario = {
        senha:this.user.password,
        login:this.user.login,
        subdominio:this.$route.query.subdominio
      };

      let autenticacao = await Authentication(formulario);

      if(autenticacao.isAuth){
        this.aplicarDadosUsuarioLogado(autenticacao);

        this.$router.push({ name: "Home" }).catch(() => {})
      }else{
        this.$notify({
          title: 'Falha no login',
          text: `
                  <p>Usuário ou senha inválidos, verifique os dados informados..</p>
          `,
          duration:5000
        });
      };

    },

    aplicarDadosUsuarioLogado(usuario){
      this.addItemToLocalStorage("dadosUsuarioLogado", {...usuario})
      this.$setStoreUsuarioLogado({
        ...usuario
      });
    },

    onChildUpdate(newValue) {
      let novoValorModel = Object.keys(newValue);

      for (let key of novoValorModel) {
        if (this.user.length > 0) {
          this.user[key] = newValue;
        } else {
          this.user[novoValorModel] = newValue[novoValorModel];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  height: 100vh !important;
  background-color: #f2f2f2;
}

.fundo-login {
  // background:linear-gradient(0deg, rgba(204,239,255,1) 0%, rgba(0,36,61,1) 100%);
  background-image: linear-gradient(
    to bottom,
    #051937,
    #143864,
    #1e5b95,
    #1e81c9,
    #00aaff
  );
}

button {
  white-space: pre;
}

// .card { background-color: rgba(255, 255, 255, 0.4); }
// .card-header, .card-footer { opacity: 1}
</style>
