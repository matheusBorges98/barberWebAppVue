<template>
    <div style="display:contents">
        <b-col @click="selected(item)" v-for="(item, index) in chaveValorArray" :key="index">
            
            <ListaCamposPersonalizados
                v-if="!Array.isArray(item)"
                :itens="item"
            />

            <b-col
                v-else
                v-for="(subitem, index) in item"
                :key="index"
                class="container"
            >
                <b-col
                    v-if="subitem.visivel"
                >   
                   <component :is="tagTexto"> {{ subitem.label }} : {{ subitem.valor }} </component>

                 </b-col>
            </b-col>
        </b-col>
    </div>
</template>

<script>

export default {
  data: function (){
    return{
      estrutura:[],
       chaveValorArray: []
    }
  },

  mounted(){
    this.criarChaveValorArray();
  },

  methods:{

    verificarSeMostraChave(chave){

        const chaveEncontrada = this.esconderChaves.find((key) => {
            return key === chave;
        });

        if (chaveEncontrada) {
            return false;
        } else {
            return true;
        }
    },

    selected(item) {
      console.log(item, "selected")
      console.log("Lista convertida", this.converterListaChaveValorParaJson(item));
    },

    converterListaChaveValorParaJson(lista){
        let json = {};

        for(let item of lista ){
            json[item.label] = item.valor
        };

        return json;
    },
  
     
    determinarTipo(valor) {
        if (typeof valor === 'number' || (!isNaN(Number(valor)) && !isNaN(Date.parse(new Date(Number(valor)))))) {
            return 'date';
        } else if (typeof valor === 'string' && !isNaN(Date.parse(valor))) {
            return 'date';
        } else {
            return 'text';
        }
    },

    montarEstruturaItens(objeto, chavePai = null) {
        const chaveValorArray = [];

        for (const chave in objeto) {
            if (objeto.hasOwnProperty(chave)) {
                const valor = objeto[chave];
                const tipo = this.determinarTipo(valor);
                
                const chaveCompleta = chavePai ? `${chavePai}.${chave}` : chave;
                const visivel = this.verificarSeMostraChave(chaveCompleta);

                if (Array.isArray(valor)) {
                    const subArray = this.montarEstruturaItens(valor, chaveCompleta);
                    chaveValorArray.push(...subArray);
                } else if (typeof valor === 'object') {
                    const subArray = this.montarEstruturaItens(valor, chaveCompleta);
                    chaveValorArray.push(...subArray);
                } else {
                    const novoObjeto = {
                        label: chave,
                        valor: valor,
                        tipo: tipo,
                        visivel: visivel
                    };
                    chaveValorArray.push(novoObjeto);
                }
            }
        }

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
    }
},

    props: {
        itens: {
            type: Array,
            required: true,
            default:[]
        },

        esconderChaves: {
            type: Array,
            required: false,
            default:[]
        },
        tagTexto:{
            type: String,
            required: false,
            default:"h6"
        }
    },
}
</script>

<style>
@media (max-width: 992px){
  .service-container {
    min-height: 35vh;
  }
}


.main-container {
  background-color: #fff;
  color: #373737;
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
  /* background-image: url('../../assets/service-background.svg'); */
  background-size: cover;
  /*border-radius: 20px;*/
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom:lightgray 1px solid;
  /*font-weight: 400;*/
  /*transition: font-weight 1s ease-out 500ms;*/
  transition: transform .2s;
  /* max-height: 15vh; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
  /* box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1); */
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; */
  /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; */
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.service-container:hover{
  transform: scale(1.08);
  /*border-bottom: rgb(31, 37, 42) 2px solid;*/

}

.service-name {
  font-size: 21px;
  font-weight: 600;
}

.service-description {
  font-size: 14px;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;
}

.service-details {
  font-size: 18px;
  font-weight: 500;
}

.no-services-found {
  font-size: 21px;
  color: #6b6e6b !important;
}

.help-new-service {
  cursor: pointer;
}
</style>