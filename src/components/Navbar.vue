<template>
   <b-navbar type="light" variant="light">
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
    </b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
    data:function(){
        return {

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
    }
}
</script>

<style>

</style>