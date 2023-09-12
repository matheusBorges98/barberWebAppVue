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
      formularioProduto:[],
      items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }
  },
  mounted() {
    this.obterProdutos();
    this.montarTabela();
  },

  methods:{

    async montarTabela(){
        this.items = await this.obterProdutos()
    },

    async obterProdutos(){
        await api({
          method: 'GET',
          url:  `/products?key_transform_camel_lower=true`,
          headers:{
            ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
            client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
            uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
          }
        });
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

</style>