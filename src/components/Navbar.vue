<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop>
      Menu
    </b-button>

    <b-sidebar
      id="sidebar-backdrop"
      backdrop
	  no-header
    >
		<b-row
			class="main-container" align-v="center"
		>
			<b-col
				class="container-logo-cliente" 
				md="12" 
				sm="12"
			>
				<b-img-lazy 
					class="logo-cliente"
					src="https://cdnfw.nyc3.digitaloceanspaces.com/framework/mborges/imagens/identidade/logoapp.png"
				>
				</b-img-lazy>       

			</b-col>
			
			<b-col 
				md="12"
				sm="12"
				class="conatiner-itens-menu"
				v-for="(link, index) in links"
				v-bind:key="index"
				
			>
				<b>
					{{link.header}}
				</b>
				<p
					v-for="(child, index) in link.links"
					v-bind:key="index"
					class="nav-item-menu"
					@click="changeRoute(child.route)"
				>
					{{child.label}}
				</p>

			</b-col>

		</b-row>
              
    </b-sidebar>
  </div>


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
				{
					"name": "Home",
					"header": "Geral",
					"links": [
						{
							"label": "Home",
							"route":"Home",
							"icon": ""
						},
						{
							"label": "Home2",
							"route":"Home2",
							"icon": ""
						}
					],
					
				},
				{
					"name": "Agendamentos",
					"header": "Agendamentos",
					"links": [
						{
							"label": "Agendar",
							"route":"agendamento",
							"icon": ""
						}
					],
					
				},
			]
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
		changeRoute(route){
			this.$router.push({name:`${route}`}).catch(() => {});
		}
    },
}
</script>

<style lang="scss">

.main-container{
	overflow-y: hidden;
	padding-left:1vw;
}

.container-logo-cliente{
	margin-top:2vh;
	justify-content: center;
    display: flex;
}

.conatiner-itens-menu{
	padding-top:0px
}

.logo-cliente{
	width: 10vw;
	height: 15vh;
}

.container-itens{
	display: flex;
	align-items: center;
}

.b-sidebar > .b-sidebar-body {
	overflow: hidden;
}

.nav-item-menu{
	padding-left:3vw;
	padding-top:1vh;
}

</style>

