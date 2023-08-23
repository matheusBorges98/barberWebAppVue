<template>
    <div>
        <b-row  style="background-color:grey" class="m-1" v-for="(item, index) in chaveValorArray" :key="index">
            
            <ListCard
                v-if="!Array.isArray(item)"
                :itens="item"
            />

            <!-- {{item[index]}} -->
            <b-col v-else style="background-color:red" lg="2" class="m-1" v-for="(subitem, index) in item" :key="index" >
                {{subitem.label}} - {{subitem.valor}}

            </b-col>
            <!-- <b-col style="background-color:red" lg="2" class="m-1" v-for="(subitem, index) in item" :key="index" >
                {{subitem}}
            </b-col>
             -->
        </b-row>
    </div>
</template>

<script>
// import Mixin from '../../core/Mixin';

export default {
//   mixins: [Mixin],
  data: function (){
    return{
      estrutura:[],
       chaveValorArray: []
    }
  },

  mounted(){
    // this.montarEstruturaItens(this.itens);
    this.criarChaveValorArray();
    console.log("mountou")
  },

  methods:{
  
     
    determinarTipo(valor) {
        if (typeof valor === 'number' || (!isNaN(Number(valor)) && !isNaN(Date.parse(new Date(Number(valor)))))) {
            return 'date';
        } else if (typeof valor === 'string' && !isNaN(Date.parse(valor))) {
            return 'date';
        } else {
            return 'text';
        }
    },

    montarEstruturaItens(objeto) {
        const chaveValorArray = [];

        for (const chave in objeto) {
            if (objeto.hasOwnProperty(chave)) {
                const valor = objeto[chave];
                const tipo = this.determinarTipo(valor);

                if (typeof valor === 'object') {
                    const subArray = this.montarEstruturaItens(valor);
                    chaveValorArray.push(...subArray);
                } else {
                    const novoObjeto = {
                        label: chave,
                        valor: valor,
                        tipo: tipo
                    };
                    chaveValorArray.push(novoObjeto);
                }
            }
        }

        // console.log(chaveValorArray, "estrutura");
        this.estrutura = chaveValorArray;

        return chaveValorArray;
    },

    criarChaveValorArray() {
      const resultado = [];

      for (const item of this.itens) {
        const itens = this.montarEstruturaItens(item);
        resultado.push(itens);
      }

      this.chaveValorArray = resultado;

      console.log(this.chaveValorArray, "ESTRUTURA")
    }
},

    props: {
        itens: {
            type: Array,
            required: true,
            default:[]
        },
    },
}
</script>

<style>

</style>