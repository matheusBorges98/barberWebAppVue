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
import Mixin from '../../core/Mixin';
import api from "../../http/index"
import imagemPadrao from "../../assets/sem_imagem.png"

export default {
  mixins: [Mixin],
  data: function () {
    return {
      servicos: [],
      comandaAberta:{},

    }
  },
  async mounted() {
    this.comandaAberta = await this.$getStore("comanda");
    console.log(this.comandaAberta, "COMANDA ABERTA SERVICOS")
    this.verificaProfissionalSelecionado();
    await this.getServices();
  },

  methods: {

    verificaProfissionalSelecionado() {

      let prestador = this.comandaAberta?.prestador;

      if(!prestador){
        this.$router.push({name: 'Prestadores'}).catch((e) => {
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
      let horario = this.comandaAberta && this.comandaAberta.horario ? this.comandaAberta.horario : undefined ;

      this.$setStoreComanda({
        ...this.comandaAberta,
        servico,
      });

      if(horario != undefined){
        return this.$router.push({name: 'Cadastro Agendamento'}).catch((e) => {
          console.error(e)
        });
      } else if(horario === undefined){
        return this.$router.push({name: 'Horarios Agendamentos'}).catch((e) => {
          console.error(e)
        })
      }

    },

    montarObjetoServico(services){
      let retorno = [];

      services.map((service)=>{
        retorno.push({
            id        : service.id,
            valor     : parseFloat(service.suggestedPrice),
            imgUrl    : service?.imgUrl ?? imagemPadrao,
            duracao   : service?.defaultDuration != null ? service.defaultDuration : 30,
            nome      : service.name,
            descricao : service.description,
            itens     : [],
            ...service
        })
      });

      return retorno;
    },

    async obterServicos(){
      let retorno =  await api({
        method: 'GET',
        url:  `/services?key_transform_camel_lower=true`,
        params:{
          sort_direction:"desc",
          sort_property:"id",
          count:true,
          per_page: 10,
          page:1 /// pegar a pgina atual da tabela
        },
        headers:{
          ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
          client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
          uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
        }
      });

      this.servicos = this.montarObjetoServico(retorno.data?.services ?? [])
    },

    async getServices() {
      await this.obterServicos();
    },

  },

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