import Vue from 'vue';

const mixin = {


    data() {
        return {
            cleanupTimer: undefined,
        };
    },

    created() {
      
    },

    mounted() {        
        this.startLocalStorageCleanupTimer();
        this.$setStoreUsuarioLogado(this.getItemsFromLocalStorage("dadosUsuarioLogado")[0]);
    },

    updated() {
        this.$setStoreUsuarioLogado(this.getItemsFromLocalStorage("dadosUsuarioLogado")[0]);
    },

    methods: {
        startLocalStorageCleanupTimer() {
            // Defina um intervalo de tempo de 15 minutos em milissegundos
            const cleanupInterval = 15 * 60 * 1000; // 15 minutos em milissegundos
        
            // Inicie um temporizador que executa a verificação a cada 15 minutos
            this.cleanupTimer = setInterval(() => {
                // Implemente a lógica para verificar e remover chaves expiradas aqui
                this.checkAndRemoveExpiredKeys();
            }, cleanupInterval);
            console.log(this.cleanupTimer)
        },

        checkAndRemoveExpiredKeys() {
        // Recupere o objeto "dadosUsuarioLogado" do Local Storage
            const userData = JSON.parse(localStorage.getItem('dadosUsuarioLogado'));
        
            // Verifique se o objeto foi recuperado com sucesso
            if (userData && userData.expire) {
                // Obtenha a data e hora atual em milissegundos
                const currentTimestamp = Date.now();
        
                // Converta o timestamp do campo "expire" para milissegundos
                const expireTimestamp = userData.expire * 1000; // Supondo que o campo "expire" esteja em segundos
        
                // Se o timestamp expirar, remova o objeto do Local Storage
                if (currentTimestamp >= expireTimestamp) {
                localStorage.removeItem('dadosUsuarioLogado');
                }
            }
        },

        addItemToLocalStorage(key, item) {
            let items = this.getItemsFromLocalStorage(key);
            items.push(item);
            localStorage.setItem(key, JSON.stringify(items));
        },
          
          // Obter itens do Local Storage
        getItemsFromLocalStorage(key) {
            let items = localStorage.getItem(key);
            return items ? JSON.parse(items) : [];
        },
      
          // Excluir um item do Local Storage
        deleteItemFromLocalStorage(key) {
            localStorage.removeItem(key);
        },

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

    beforeDestroy() {
        clearInterval(this.cleanupTimer);
    },


   };
 
   export default mixin;