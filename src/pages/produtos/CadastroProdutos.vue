<template>
  <b-row :class="'justify-content-md-center fundo-login'">
    <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      containerSlotClass="text-center"
      transitionName="slide-right"
      titulo="Cadastro de Produtos"
      subtitulo="Crie ou edite um produto"
    >
      <!-- <b-col>
        <b-img-lazy
          :rounded="true"
          :src="require('../../assets/mb-solucoes.png')"
          :width="150"
          :height="150"
          :blank="true"
        >
        </b-img-lazy>
      </b-col> -->

      <b-row>
        <b-col
            class="text-center mt-5"
            v-for="input in inputs"
            v-bind:key="input.model"
            :sm="input.sm"
            :md="input.md"
            :lg="input.lg"
            :xl="input.xl"
            :cols="input.cols"
        >
            <CustomInput
            class="text-center"
            :label="input.label"
            :placeholder="input.placeholder"
            :isMultiselect="input.isMultiselect"
            :labelsMultiselect="input.labelsMultiselect"
            :multiselectOptions="input.multiselectOptions"
            :type="input.type"
            :formatter="input.formatter"
            v-model="input.model"
            :id="input.id"
            :valid="null"
            v-on:changeValue="onChildUpdate"
            />
        </b-col>
      </b-row>
    </Card>
  </b-row>
</template>


<script>
import Mixin from '../../core/Mixin';
import axios from "axios";

export default {
  mixins: [Mixin],
  data: function (){
    return{
      inputs:[],
      formularioProduto:[]
    }
  },
  mounted() {
    this.obterInputs();
  },

  methods:{
    obterInputs(modo){
      /*
        modo : 
          1 : Login completo
          2 : Login simplificado

          To do: 
            Criar requisicao que busque os inputs desta tela.
      */

    let retorno;
    
    retorno =   [
        {
            label: "Código do produto",
            id:"codProduct",
            model:"codProduct",
            placeholder: "",
            sm:"12",
            md:"6",
            lg:"3",
            xl:"3",
            cols:"12",

        },
        {
            label: "Nome do Produto",
            id:"productName",
            model:"productName",
            placeholder: "Digite o nome do produto",
            sm:"12",
            md:"6",
            lg:"3",
            xl:"3",
            cols:"12",
        },
      ]

    this.inputs = retorno;
    },

    onChildUpdate(newValue) {
      let novoValorModel = Object.keys(newValue);

      for (let key of novoValorModel) {
        if (this.formularioProduto.length > 0) {
          this.formularioProduto[key] = newValue;
        } else {
          this.formularioProduto[novoValorModel] = newValue[novoValorModel];
        }
      };

      console.log(this.formularioProduto)


    //   this.$router.push({ path: `/login?subdominio=${this.formularioProduto.empresa.subdominio}` }).catch(() => {})
    },
  }
}
</script>

<style lang="scss" scoped>
.service-container{
  height: 100%;
}

@media (max-width: 992px){
  .service-container {
    min-height: 65vh;
  }
}

.main-container {
  background-color: #fff;
  color: #373737;
  box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  padding: 30px;
  cursor: pointer;
}

.container {
  margin-top: 5px;
  cursor: pointer;
}

/*.information-container{}*/

/*.information-container :hover {*/
/*  transform: rotate(360deg);*/
/*}*/

.service-container {
  background-color: white;
  border-radius: 10px;
  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 0px;
  // border-bottom-left-radius: 15px;
  /*font-weight: 400;*/
  /*transition: font-weight 1s ease-out 500ms;*/
  transition: transform .2s;
}

.service-container:hover{
  transform: scale(1.06);
  //border-bottom:rgb(0, 96, 177) 2px solid;

}



.service-name {
  font-size: 16px;
  font-weight: 530;
}

.service-description {
  font-size: 14px;
  font-weight: 500;
}

.service-details {
  font-size: 15px;
  font-weight: 500;
}

.service-date-humanized {
  font-size: 16px;
  font-weight: 600;
}
</style>