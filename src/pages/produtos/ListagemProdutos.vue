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
      <b-row class="mt-5">
       <b-col class="d-flex justify-content-start">
         
        <b-button variant="outline-primary" class="col-2 m-1" v-on:click="cadastroProduto()">
          Novo
        </b-button>

       </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-table 
              striped 
              hover 
              :fields="fields"
              :items="items"
              stacked="lg"
          >
            <template #cell(actions)="row">
              <div>
                <b-dropdown id="dropdown-1" class="m-md-2">
                  <template #button-content>
                    <b-icon icon="three-dots"></b-icon>
                  </template>

                  <b-dropdown-item @click="cadastroProduto(row.item)">Editar</b-dropdown-item>
                  <b-dropdown-item>Remover</b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
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
      items: [],
      fields:[]
    }
  },
  async mounted() {
    this.montarCabecalhosTabela();
    this.montarTabela();
  },

  methods:{

    cadastroProduto(produto = {}){
      this.$router.push({name: 'Cadastro Produto', params: {produto}}).catch((e) => {
        console.error(e)
      })
    },

    async obterCabecalhosTabela(){
      // to do:
         return [
         {
          key: 'id',
          sortable: true,
          label: 'id',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'uid',
          sortable: true,
          label: 'uid',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'createdAt',
          sortable: true,
          label: 'createdAt',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'updatedAt',
          sortable: true,
          label: 'updatedAt',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'deletedAt',
          sortable: true,
          label: 'deletedAt',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'code',
          sortable: true,
          label: 'code',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
        {
          key: 'name',
          sortable: true,
          label: 'Nome'
        },
         {
          key: 'description',
          sortable: true,
          label: 'description',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
         {
          key: 'active',
          sortable: true,
          label: 'Ativo',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
        {
          key: 'active',
          sortable: true,
          label: 'Ativo',
          thClass: 'd-none',
          tdClass: 'd-none'
        },
        {
          key: 'code',
          sortable: false,
          label: 'Código',
        },
        {
          key: 'suggestedPrice',
          label: 'Preço Sugerido',
          // sortable: true,
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        },
        {
          key: 'actions',
          label: '',
          // sortable: true,
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        }
      ]
    },

    async montarCabecalhosTabela(){
      this.fields = await this.obterCabecalhosTabela()
    },

    async montarTabela(){
      this.items = await this.obterProdutos()
      console.log(this.items, "items")
    },

    async obterProdutos(){
      let retorno =  await api({
        method: 'GET',
        url:  `/products?key_transform_camel_lower=true`,
        headers:{
          ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
          client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
          uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
        }
      });

      return retorno.data.products
    }

  }
}
</script>

<style lang="scss" scoped>

</style>