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
          v-model="input.model"
          :valid="null"
          v-on:changeValue="onChildUpdate"
        />
      </b-col>
      <b-col cols="12" style="margin-top: 5vh">
        <b-row class="text-center" style="align-content: space-between">
          <b-col cols="6">
            <b-button variant="outline-primary" class="col-12" v-on:click="sendData()">
              Criar conta
              <b-icon icon="person-plus"></b-icon>
            </b-button>
          </b-col>
           <b-col cols="6">
            <b-button variant="outline-primary" class="col-12" v-on:click="sendData()">
              Entrar
              <b-icon icon="arrow-bar-right"></b-icon>
            </b-button>
          </b-col>

          <b-col cols="12" class="mt-4">
            <b-button variant="outline-secondary" class="col-12" v-on:click="sendData()">
              Esqueci minha senha
              <b-icon icon="key-fill"></b-icon>
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

export default {
  components: {},
  mixins: [Mixin],
  data: function () {
    return {
      user: [],
      inputs: [
        {
          label: "Nome",
          model: "name",
          placeholder: "Digite seu nome",
        },
        {
          label: "Senha",
          model: "pass",
          placeholder: "Digite sua senha",
        },
        {
          label: "Estabelecimento",
          model: "empresa",
          placeholder: "Procure o estabelecimento desejado",
          isMultiselect:true,
          multiselectOptions:[
            // { value: "Selecione uma", text: '' },
            { value: 'Barbearia 99', text: 'Barbearia 99' },
            { value: 'Barbearia Norte', text: 'Barbearia Norte', },
          ]
        },
      ],
    };
  },
  methods: {
    async sendData() {
      console.log(this.user)
      // let autenticacao = {
      //   key: "chaveapiteste"
      // };

      const { nome, senha, estabelecimento } = this.user;
      
      let autenticacao = await Authentication(nome, senha, estabelecimento );

      console.log(autenticacao, "sendData")
      // autenticacao.key != ""
      //   ? this.$router.push({ name: "Home" }).catch(() => {})
      //   : null;

      // this.$setStoreUsuarioLogado({
      //   apiKey: autenticacao.key,
      //   ...this.user
      // });
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
