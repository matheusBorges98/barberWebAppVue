import Vue from 'vue';

const mixin = {


    data() {
        return {
            
        };
    },

    created() {
      
    },

    mounted() {        
       
    },

    updated() {

    },

    methods: {
        //Cria e atualiza a variavel userData no vuex
        $setStoreUsuarioLogado(data){
            this.$store.commit(`setPropriedades`, {informacoesUsuarioLogado : {...data}});        
        },
        
        //Cria e atualiza a variavel servicosOferecidos no vuex
        $setStoreServicosOferecidos(data){
            this.$store.commit(`setPropriedades`, {servicosOferecidos : {...data}});        
        },

        $setStoreServicosAgendados(data){
            this.$store.commit(`setPropriedades`, {servicosAgendados : data});        
        },

        $setStoreServico(data){
            this.$store.commit(`setPropriedades`, {servico : data});        
        }
    },


   };
 
   export default mixin;