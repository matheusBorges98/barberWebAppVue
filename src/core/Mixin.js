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
        // Função para converter a data para uma forma humanizada em português
        humanizarDateString(dataString) {
            const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];
        
            const data = new Date(dataString);
            const dia = data.getDate();
            const mes = meses[data.getMonth()];
            const ano = data.getFullYear();
            const hora = data.getHours();
            const minutos = data.getMinutes();
        
            return `${dia} de ${mes} de ${ano}, às ${hora}h${minutos.toString().padStart(2, '0')}`;
        },
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