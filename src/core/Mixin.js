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
        isAdmin(){
            // pegar com base no usuário logado se é ou nao admin.
            return false
        },

        isMobile(){
            return window.innerWidth <= 768;
        },

        arredondarTimestampParaBaixo(timestamp) {
            const dt = new Date(timestamp);

            // Arredondar para baixo para o intervalo de 30 minutos
            const minutes = dt.getMinutes();
            const roundedMinutes = Math.floor(minutes / 30) * 30;
            dt.setMinutes(roundedMinutes, 0, 0);
          
            // Obter o timestamp arredondado em milissegundos
            const roundedTimestamp = dt.getTime();
          
            return roundedTimestamp;
        },

        // Função para converter a data para uma forma humanizada em português
        humanizarTimestamp(timestamp) {
            const meses = [
                "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
              ];
            
              const data = new Date(timestamp);
              const dia = data.getDate();
              const mes = meses[data.getMonth()];
              const ano = data.getFullYear();
              const hora = data.getHours();
              const minutos = data.getMinutes();
            
              return `${dia} de ${mes} de ${ano}, às ${hora}h${minutos.toString().padStart(2, '0')}`;
        },
        //Cria e atualiza a variavel userData no vuex
        $setStoreUsuarioLogado(data){
            this.$store.commit(`setPropriedades`, {dadosUsuarioLogado : {...data}});        
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