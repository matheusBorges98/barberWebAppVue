<template>
  <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      v-if="servicos"
      titulo="Serviços"
      subtitulo="Selecione o serviço desejado"
      containerSlotStyle="top: 0; position: relative;"
      containerSlotClass="text-center"
  >

    <b-row>
      <b-col
          xl="12"
          lg="12"
          md="12"
          sm="12"
          v-if="servicos && servicos.length == 0"
          class="d-flex align-items-center justify-content-center mt-5 no-services-found"

      >
        <p>Não há serviços cadastrados, cadastre novos serviços <b @click="newService()"
                                                                   class="help-new-service">aqui</b></p>
      </b-col>
      <b-col
          xl="6"
          lg="6"
          md="12"
          sm="12"
          v-if="servicos && servicos.length > 0"
          v-for="servico in servicos"
          :key="servico.id"
          class="container"
          @click="selected(servico)"
      >
        <b-row align-v="center" class="m-1 p-3 service-container">
          <b-col sm="2" class="p-1">
            <b-img height="100px" width="100px" :src="servico.imgUrl" rounded="circle"
                   alt="Circle image"></b-img>
          </b-col>

          <b-col sm="10" class="mt-3">

            <b-col sm="12">
              <b-col
                  sm="12"
                  class="text-start information-container mt-1"
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
    </b-row>
  </Card>
</template>

<script>
export default {
  data: function () {
    return {
      servicos: []

    }
  },
  mounted() {
    this.getServices();
  },

  methods: {

    newService() {
      return this.$router.push({name: 'cadastroServico'}).catch((e) => {
        console.error(e)
      })
    },

    selected(servico) {
      console.log(servico)
      if(this.$route.params && this.$route.params.horario){
        return this.$router.push({name: 'Cadastro Agendamento', params: {servico, horario:this.$route.params.horario}}).catch((e) => {
          console.error(e)
        })
      }else{
        return this.$router.push({name: 'Agendamentos', params: {servico}}).catch((e) => {
          console.error(e)
        })
      }

    },

    getServices() {
      // buscar da api

      this.servicos = [
        {
          id: "a",
          valor: "30,00",
          imgUrl: "https://modamasculina.inf.br/wp-content/uploads/2020/05/Cortes-de-Cabelo-Masculino-2021.jpg",
          duracao: "30",
          nome: "Corte",
          descricao: "Corte de cabelo utilizando apenas máquina e acabamento na lamina",
          itens: [{
            id: "a1",
            nome: "Lamina",
            quantidade: "1"
          }]
        },
        {
          id: "b",
          valor: "45,00",
          imgUrl: "data:image/jpeg;base64,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",
          duracao: "30",
          nome: "Corte com degradê",
          descricao: "Corte de cabelo utilizando tesoura, máquina e acabamento na lamina",
          itens: [{
            id: "a1",
            nome: "Lamina",
            quantidade: "1"
          }]
        },
        {
          id: "c",
          valor: "50,00",
          imgUrl: "data:image/jpeg;base64,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",
          duracao: "40",
          nome: "Corte degradê + Sobrancelha",
          descricao: "Corte de cabelo utilizando apenas máquina e acabamento na lamina. ",
          itens: [{
            id: "a1",
            nome: "Lamina",
            quantidade: "1"
          }]
        },
        {
          id: "d",
          valor: "20,00",
          imgUrl: "data:image/jpeg;base64,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",
          duracao: "20",
          nome: "Barba com toalha quente",
          descricao: "Barba completa com toalha quente",
          itens: [{
            id: "a1",
            nome: "Lamina",
            quantidade: "1"
          }]
        },
      ];

      // this.servicos = []
    }
  }
}
</script>

<style>
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
}

.service-container:hover{
  transform: scale(1.08);
  /*border-bottom: rgb(31, 37, 42) 2px solid;*/

}

.service-name {
  font-size: 18px;
  font-weight: 600;
}

.service-description {
  font-size: 14px;
  font-weight: 400;
}

.service-details {
  font-size: 14px;
  font-weight: 500;
}

.no-services-found {
  font-size: 16px;
  color: #6b6e6b !important;
}

.help-new-service {
  cursor: pointer;
}

</style>