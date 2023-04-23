<template>
  <b-row>
    <!-- <Navbar/> -->
    <Card
        colSM="12"
        colMD="12"
        colLG="12"
        colXL="12"
        containerSlotStyle="top: 0; position: relative;"
        containerSlotClass="text-center"
    >
      <b-row>
        <b-col
            xl="4"
            lg="4"
            md="6"
            sm="12"
            v-for="menu in menus"
            :key="menu.id"
            class="container"
            @click="selected(menu)"
        >
          <b-row align-v="center" class="m-0 p-3 service-container">
             <b-col
                  sm="12"
                  class="text-center mt-1"
              >
                <h5 class="service-name">{{ menu.nome }}</h5>

              </b-col>
          </b-row>
        </b-col>
      </b-row>
    </Card>
  </b-row>
</template>

<script>
/* eslint-disable */

export default {
  components: {},
  data: function () {
    return {
      json:[],
      menus:[
        {
          "id":"menuNovoAgendamento",
          "nome": "Novo agendamento",
          "rota":"Horarios Agendamentos"
        },
        {
          "id":"menuMeusAgendamentos",
          "nome": "Meus agendamentos",
          "rota":"Meus Agendamentos"
        },
        {
          "id":"menuServicosDisponiveis",
          "nome": "Serviços",
          "rota":"Servicos"
        },
       
      ]
    }
  },

  mounted(){            
    console.log(this.$store.getters.getPropriedades.userData, "store")
  },

  methods:{
    selected(menu){
      this.$router.push({ name: menu.rota }).catch(() => {})
    }
  }

  
}
</script>
<style>

/* div.jsoneditor-outer.has-main-menu-bar {
  background-color: grey;
}

.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected{
  background-color:grey !important;
}

.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected :focus{
  background-color: grey;
}

.jsoneditor-container.min-box {
  min-width: auto !important;
}

div.jsoneditor-menu a.jsoneditor-poweredBy {
  display: none !important;
}

.jsoneditor-frame{
  border-radius:10px
}

.jsoneditor-treepath{
  color: #fff;
} */

.container{
  /* width: 75vw;
  height:90vh;
  background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(237, 237, 237) 19%, rgb(232, 232, 232) 78%);
  border-bottom-left-radius: 185px;
  border-bottom-right-radius: 100px;
  border-top-right-radius: 185px; */
}

.text{
  font-weight: 900;
  font-size:25px;
  color:rgb(48, 48, 48)
}

.container {
  margin-top: 5px;
  cursor: pointer;
 
}

.service-container {
  background-color: white;
  background-image: url('../../assets/service-background.svg');
  background-size: cover;
  /*border-radius: 20px;*/
  /*border-top-right-radius: 30px;*/
  /*border-bottom-right-radius: 0px;*/
  /*border-bottom-left-radius: 30px;*/
  border-bottom:lightgray 1px solid;
  /*font-weight: 400;*/
  /*transition: font-weight 1s ease-out 500ms;*/
  transition: transform .2s;
  
  /* width: 30vw !important; */
  height: 20vh !important;
}

.service-container:hover{
  transform: scale(1.08);
  /*border-bottom: rgb(31, 37, 42) 2px solid;*/

}

.service-name {
  font-size: 18px;
  font-weight: 600;
}


</style>