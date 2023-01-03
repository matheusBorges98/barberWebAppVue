<template>
    <BootstrapSidebar
      :initial-show="initialShow"
      :links="links"
      :header="header"
      :fa="true"
      @sidebarChanged="onSidebarChanged"
    >
    
      <template v-slot:navbar>
       
        <!-- <b-navbar
          id="mainNavbar"
          toggleable="lg"
          type="light"
          variant="light"
          fixed="top"
        > -->
          <!-- <b-navbar-nav> -->
            <!-- <b-nav-item>  -->
               <!-- <b-img-lazy 
                style="width:50px; height:50px"
                src="https://cdnfw.nyc3.digitaloceanspaces.com/framework/mborges/imagens/identidade/logoapp.png"
                v-bind="mainProps"
                >
               </b-img-lazy>        -->

             <!-- </b-nav-item> -->
          <!-- </b-navbar-nav> -->
        <!-- </b-navbar> -->
      </template>

      <template v-slot:content>
        <b-container style="margin-top: 56px">
          <router-view />
        </b-container>
      </template>
    </BootstrapSidebar>

</template>

<script>
import BootstrapSidebar from "vue-bootstrap-sidebar";
export default {
    components: {
        BootstrapSidebar,
    },
    name: 'Navbar',
    
    data:function(){
        return {
            initialShow: false,
            header: "",
            links: [
                { name: "Home", href: { name: "Home" }, faIcon: "home" },
                { name: "Agendamentos", href: { name: "agendamentos" }, faIcon: "calendar" },
                { name: "Sair", href: { name: "Login" }, faIcon: "arrow-left" },
            ],
            mainProps: {
              center: true,
              fluidGrow: true,
              blank: true,
              blankColor: '#bbb',
              width: 100,
              height: 200,
              class: 'my-5'
            }
            
        }
    },
    props: {
        menu: {
            type: Array,
        },
    },
    computed:{
        
    },
    mounted(){
        console.log(this.$route)
    },
     methods: {
    onSidebarChanged() {},
  },
}
</script>

<style lang="scss">
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>

