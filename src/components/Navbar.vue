<template>
 <div id="App">
    <BootstrapSidebar
      :initial-show="initialShow"
      :links="links"
      :header="header"
      :fa="true"
      @sidebarChanged="onSidebarChanged"
    >
      <template v-slot:navbar>
        <b-navbar
          id="mainNavbar"
          toggleable="lg"
          type="light"
          variant="light"
          fixed="top"
        >
          <b-navbar-nav>
            <b-nav-item> Navbar </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </template>

      <template v-slot:content>
        <b-container style="margin-top: 56px">
          <router-view />
        </b-container>
      </template>
    </BootstrapSidebar>
  </div>
   <!-- <b-navbar type="light" variant="light">
        <b-navbar-nav>

            <b-nav-item-dropdown 
                v-for="menu in construtorMenu" 
                v-if="menu.dropdown"
                v-bind:key="menu.nome" 
                :text="menu.nome" 
            >
                <b-dropdown-item 
                    v-for="drop in menu.dropdown" 
                    v-bind:key="drop.nome" 
                >
                    <p 
                        @click="drop.click"
                    >
                            {{drop.nome}}
                    </p>
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar> -->
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
            initialShow: true,
            header: "<h3>Sidebar</h3>",
            links: [
                { name: "Home", href: { name: "home" }, faIcon: ["fas", "home"] },
                    {
                    name: "Dropdown",
                    faIcon: ["fas", "tint"],
                    children: [
                        {
                        name: "Child Item 1",
                        href: {
                            name: "child-item-1",
                        },
                        faIcon: ["fas", "child"],
                        },
                        {
                        name: "Child Item 2",
                        href: {
                            name: "child-item-2",
                        },
                        faIcon: ["fas", "child"],
                        },
                    ],
                    },
                    { name: "About", href: { name: "about" }, faIcon: "users" },
                    { name: "Contact", href: { name: "contact" }, faIcon: "phone" },
                ],
            
            }
    },
    props: {
        menu: {
            type: Array,
        },
    },
    computed:{
        construtorMenu(){
            return [
                {
                    nome:"Categorias",
                    dropdown:[
                        {
                            nome:"Carros",
                            click:()=>this.$router.push({name:'Login'})
                        },
                        {
                            nome:"Caminhonete",
                            click:()=>this.$router.push({name:'Login'})
                        }
                    ]
                },
                     {
                    nome:"Meus anuncios",
                    dropdown:[
                        {
                            nome:"Criar anuncio",
                            click:()=>this.$router.push({name:'Login'})
                        },
                        {
                            nome:"Ver meus anuncios",
                            click:()=>this.$router.push({name:'Login'})
                        }
                    ]
                },
                {
                    nome:"Notificações",
                    click:()=>this.$router.push({name:'Login'})
                }
            ]

        }
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

