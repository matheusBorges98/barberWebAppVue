<template>
  <b-row :class="'justify-content-md-center fundo-login'">
    <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      containerSlotClass="text-center"
      transitionName="slide-right"
      titulo="Listagem de Produtos"
    >
      <b-row>
        <b-col>
            <b-table 
                striped 
                hover 
                :items="items"
                stacked="lg"
            >
            </b-table>
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
      items: []
    }
  },
  async mounted() {
    this.montarTabela();
  },

  methods:{

    obterCabecalhosTabela(){
      // to do:
    },

    async montarTabela(){
      this.items = await this.obterProdutos()
      console.log(this.items)
    },

    async obterProdutos(){
      let retorno =  await api({
        method: 'GET',
        url:  `/services?key_transform_camel_lower=true`,
        headers:{
          ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
          client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
          uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
        }
      });

      return retorno.data.services
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

      console.log(this.formularioProduto);
    },
  }
}
</script>

<style lang="scss" scoped>

</style>