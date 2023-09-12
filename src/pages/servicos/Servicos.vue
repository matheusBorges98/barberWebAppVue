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
          xl="4"
          lg="6"
          md="12"
          sm="12"
          v-else
          v-for="servico in servicos"
          :key="servico.id"
          class="container"
          @click="selected(servico)"
      >
        <b-row align-v="center" class="m-2 p-3 service-container">
          <b-col sm="3" class="p-0">
            <b-img height="80vh" width="80vw" :src="servico.imgUrl" rounded="circle"
                   alt="Circle image"></b-img>
          </b-col>

          <b-col sm="9">

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
      servicos: [],

    }
  },
  mounted() {
    console.log(this.$route.params, "Servicos")
    this.verificaProfissionalSelecionado();
    this.getServices();
  },

  methods: {

    verificaProfissionalSelecionado() {
      if(this && this.$route && !this.$route.params.prestador){
        this.$router.push(
          {
            name: 'Prestadores', 
            params: {
              ...this.$route.params
              // horario:this.$route.params?.horario ?? ""
            }
          }).catch((e) => {
          console.error(e)
        });
      }

    },

    newService() {
      return this.$router.push({name: 'cadastroServico'}).catch((e) => {
        console.error(e)
      })
    },

    selected(servico) {
      console.log(servico)
      if(this.$route.params && this.$route.params.horario){
        return this.$router.push(
          {
            name: 'Cadastro Agendamento', 
            params: {
              servico,
              horario:this.$route.params.horario,
              ...this.$route.params
            }
          }).catch((e) => {
          console.error(e)
        });
      }else{
        return this.$router.push({name: 'Horarios Agendamentos', params: {...this.$route.params, servico}}).catch((e) => {
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
          imgUrl: "https://cdn.openart.ai/uploads/image_3U5a2H_K_1688606004903_512.webp",
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
          imgUrl: "https://cdn.openart.ai/uploads/image_dAgS5S90_1688605734196_512.webp",
          duracao: "60",
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
          duracao: "30",
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
          valor: "30,00",
          imgUrl: "https://cdn.openart.ai/uploads/image_63idQpGD_1688606275275_512.webp",
          duracao: "30",
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

<style scoped>
@media (max-width: 992px){
  .service-container {
    min-height: 35vh;
  }
}


.main-container {
  background-color: #fff;
  color: #373737;
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
  /* background-image: url('../../assets/service-background.svg'); */
  background-size: cover;
  /*border-radius: 20px;*/
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom:lightgray 1px solid;
  /*font-weight: 400;*/
  /*transition: font-weight 1s ease-out 500ms;*/
  transition: transform .2s;
  /* max-height: 15vh; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
  /* box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1); */
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; */
  /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; */
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.service-container:hover{
  transform: scale(1.08);
  /*border-bottom: rgb(31, 37, 42) 2px solid;*/

}

.service-name {
  font-size: 21px;
  font-weight: 600;
}

.service-description {
  font-size: 14px;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;
}

.service-details {
  font-size: 18px;
  font-weight: 500;
}

.no-services-found {
  font-size: 21px;
  color: #6b6e6b !important;
}

.help-new-service {
  cursor: pointer;
}

</style>