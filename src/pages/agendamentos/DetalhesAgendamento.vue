<template>
  <div>
    <Card
        colSM="12"
        colMD="12"
        colLG="12"
        colXL="12"
        containerSlotStyle="top: 0; position: relative;"
        containerSlotClass="text-center"
        titulo="Detalhes do agendamento"
        subtitulo="Verifique detalhes do serviço agendado."
    >

      <b-row>
        <b-col
            xl="12"
            lg="12"
            md="12"
            sm="12"
        >
          <b-row align-v="center" class="m-1 p-3 service-container">
            <b-col sm="2" class="p-1">
              <b-img height="100px" width="100px" :src="servico.imgUrl" rounded="circle"
                     alt="Circle image"></b-img>
            </b-col>

            <b-col sm="10">

              <b-col sm="12">
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <h5 class="service-name">{{ servico.nome }}</h5>

                </b-col>
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <p class="service-description">{{ servico.descricao }} </p>
                </b-col>
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <b-row>
                    <b-col sm="6">
                      <h6 class="service-details">{{ servico.duracao }} minutos
                        <b-icon icon="clock-fill"></b-icon>
                      </h6>
                    </b-col>
                    <b-col sm="6">
                      <h6 class="service-details">R${{ servico.valor }} </h6>
                    </b-col>
                  </b-row>

                </b-col>

              </b-col>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" style="margin-top:5vh">
          <b-row class="text-center" style="align-content: space-between;">
            <b-col cols="12">
              <b-button variant="light" class="col-12" v-on:click="voltar()">
                Voltar
                <b-icon icon="arrow-return-left"></b-icon>
              </b-button>
            </b-col>

            <b-col cols="12"  style="margin-top:10px">
              <b-button variant="danger" class="col-12" v-on:click="cancelarAgendamento()">
                Cancelar Agendamento
                <b-icon icon="bookmark-check-fill"></b-icon>
              </b-button>
            </b-col>

          </b-row>
        </b-col>
      </b-row>
    </Card>
  </div>
</template>

<script>
export default {
  data: function (){
    return{
      evento:{},
      servico:{}
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.evento = this.$route.params.evento;

    if(this.evento && this.evento.servico){
      this.servico = this.evento.servico;
    };
  },

  methods:{
    voltar(){
      this.$router.go(-1);
    },

    cancelarAgendamento(){

    }
  }
}
</script>

<style lang="scss" scoped>

@media (max-width: 992px){
  .service-container {
    min-height: 50vh;
  }
}

.main-container {
  background-color: #fff;
  color: #373737;
  box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  padding: 30px;
  cursor: pointer;
}

.container {
  margin-top: 5px;
  cursor: pointer;
}

/*.information-container{}*/

/*.information-container :hover {*/
/*  transform: rotate(360deg);*/
/*}*/

.service-container {
  background-color: white;
  border-radius: 10px;
  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 0px;
  // border-bottom-left-radius: 15px;
  /*font-weight: 400;*/
  /*transition: font-weight 1s ease-out 500ms;*/
  transition: transform .2s;
}

.service-name {
  font-size: 16px;
  font-weight: 530;
}

.service-description {
  font-size: 14px;
  font-weight: 500;
}

.service-details {
  font-size: 15px;
  font-weight: 500;
}
</style>