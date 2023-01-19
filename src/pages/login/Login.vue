<template>
  <b-row style="height: 100vh; background:black" :class="'justify-content-md-end'">
      <Card 
        cols="3"
        :alignRight="true"
        :logoUrl="''"
      >
        <b-col v-for="input in inputs" v-bind:key="input.model">
          <CustomInput
            class="text-center"
            :label="input.label"
            :placeholder="input.placeholder"
            v-model="input.model"
            :valid="null"
            v-on:changeValue="onChildUpdate"
          />
        </b-col>
        <b-col cols="12" style="margin-top:5vh">
          <b-row class="text-center">
            <b-col cols="6">
              <b-button v-on:click="sendData()">Novo</b-button>
            </b-col>
            <b-col cols="6">
              <b-button v-on:click="sendData()">Enviar</b-button>
            </b-col>
          </b-row>
        </b-col>
      </Card>

  </b-row> 
</template>

<script>
/* eslint-disable */

import authentication from '../../services/authentication'
import CustomInput from '../../components/CustomInput.vue'

export default {
  components: {},
  data: function () {
    return {
      user: [],
      inputs: [
        {
          label: 'Nome',
          model: 'name',
          placeholder: 'Digite seu nome',
        },
        {
          label: 'Senha',
          model: 'pass',
          placeholder: 'Digite sua senha',
        },
      ],
    }
  },
  methods: {
    async sendData() {
      let isAuth      = false,
      {nome, senha}   = this.user;
      isAuth          = await authentication(nome, senha);
      isAuth = true
      isAuth          == true ? this.$router.push({name:'Home'}).catch(() => {}) : null;
      

    },

    onChildUpdate(newValue) {
      let novoValorModel = Object.keys(newValue);

      for (let key of novoValorModel) {
          if(this.user.length > 0){
            this.user[key] = newValue
        }else{
          this.user[novoValorModel] = newValue[novoValorModel]
        }
      }

    },

  },
}
</script>

<style>

</style>
