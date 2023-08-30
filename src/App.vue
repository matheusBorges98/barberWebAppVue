<template>
  <div id="app">
    <notifications
        position="top right"
        classes="custom-notify vue-notification"
    />
    <Navbar
        v-if="$route && $route.name != 'Login' && $route.name != 'Estabelecimentos'"
    />
<!--    <b-row v-if="$route && $route.name != 'Login'" class="container-route-name">-->
<!--      <b-col class="text-center p-1">-->
<!--        <h6 class="route-name">{{ $route.name }}-->
<!--          <b-icon icon="file-break-fill"></b-icon>-->
<!--        </h6>-->
<!--      </b-col>-->
<!--    </b-row>-->
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  created() { 

    if(this.$route.query && this.$route.query.subdominio && this.$route.query.subdominio != ""){
      Vue.prototype.$subdominio = this.$route.query.subdominio
    }else{
      Vue.prototype.$subdominio = "semsubdominio"
    }

    /*TO DO:
      Criar requisicao que buscará o css do subdominio

      - Se nao houver subdominio, irá redirecionar para selecao de subdominios.
    */
  },

}
</script>
>

<style lang="scss">
#app {
  //font-family: Verdana, Geneva, sans-serif;
  color: #282A35;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.container-route-name {
  color: #f2f2f2;
  background-color: rgb(0, 96, 177);
}

.route-name{
  font-weight: 540;
}

.custom-notify{
  background-color: white;
  color:black;
  font-size: 16px;
}

.notification-content{
  font-size: 14px;
}

.notification-title{
  padding:5px
}

</style>
