<template>
  <b-row :class="'justify-content-md-center fundo-login'">
    <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      containerSlotClass="text-center"
      transitionName="slide-right"
      titulo="Cadastro de Serviços"
      subtitulo="Crie ou edite um serviço"
    >
      <b-row class="p-2">
        <b-col
          class="text-center mt-3"
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
            :inputType="input.inputType"
            :formatter="input.formatter"
            v-model="input.model"
            :modelValue="input.value"
            :id="input.id"
            :valid="null"
            v-on:changeValue="onChildUpdate"
          />
        </b-col>
      </b-row>

      <b-row class="mt-5">
       <b-col class="d-flex justify-content-end">
         
        <b-button variant="outline-primary" class="col-2 m-1" v-on:click="listagemServicos()">
          Voltar
        </b-button>
         
        <b-button variant="primary" class="col-2 m-1" v-on:click="enviarFormulario()">
          Gravar produto
        </b-button>

       </b-col>
      </b-row>
       
    </Card>
  </b-row>
</template>


<script>
import Mixin from '../../core/Mixin';
import api from "../../http/index"


export default {
  mixins: [Mixin],
  data: function (){
    return{
      inputs:[],
      formularioServico:[]
    }
  },
  mounted() {
    this.obterInputs();
    this.popularFormulario();
  },

  methods:{
    popularFormulario(){
      if(this.$route && this.$route.params && this.$route.params.servico){
        
        for(let i = 0; i < this.inputs.length; i++){
          console.log(this.$route.params.servico[this.inputs[i].model])

          if(this.$route.params.servico[this.inputs[i].model] != undefined){
              this.inputs[i] = {
                ...this.inputs[i],
                value : this.$route.params.servico[this.inputs[i].model]
            }
          }
          
        };
        
      };

    },

    listagemServicos(){
      this.$router.push({name: 'Listagem Servicos', params: {}}).catch((e) => {
          console.error(e)
        })
    },

    async enviarFormulario(){
      console.log(this.$store.getters.getPropriedades?.dadosUsuarioLogado, "DADOS USER ENVIAR FORM")
      try{
        await api({
          method: 'post',
          url:  `/services`,
          data: {
            ...this.formularioServico
          },
          headers:{
            ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
            client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
            uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
          }
        });

        this.$router.push({ path: `listagemServicos` }).catch(() => {})
      }catch(e){
         this.$notify({
          title: 'Falha ao gravar Serviço',
          text: `
                  <p>Não foi possível gravar o serviço, verifique o formulário e tente novamente</b>.</p>
          `,
          duration:5000,
          type: 'warn'
        });

        console.error(e);
      }
    
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
    
    retorno =   [
        {
            label: "Código do Servico",
            id:"code",
            model:"code",
            placeholder: "",
            sm:"12",
            md:"6",
            lg:"3",
            xl:"3",
            cols:"12",

        },
        {
            label: "Nome do Servico",
            id:"name",
            model:"name",
            placeholder: "Digite o nome do Servico",
            sm:"12",
            md:"6",
            lg:"3",
            xl:"3",
            cols:"12",
        },
         {
            label: "Descrição",
            id:"description",
            model:"description",
            // placeholder: "Digite o nome do Servico",
            sm:"12",
            md:"8",
            lg:"6",
            xl:"3",
            cols:"12",
        },
         {
            label: "Sugestão de Preço",
            id:"suggestedPrice",
            model:"suggestedPrice",
            inputType:"number", 
            // placeholder: "Digite o nome do Servico",
            sm:"12",
            md:"4",
            lg:"6",
            xl:"3",
            cols:"12",
        },
      ]

    this.inputs = retorno;
    },

    onChildUpdate(newValue) {
      let chave = Object.keys(newValue);

      for (let key of chave) {
        if (this.formularioServico.length > 0) {
          this.formularioServico[key] = newValue;
        } else {
          this.formularioServico[chave] = newValue[chave];
        }
      };

    },
  }
}
</script>

<style lang="scss" scoped>

</style>