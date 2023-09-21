<template>
  <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      v-if="prestadores"
      titulo="Prestadores"
      subtitulo="Selecione o profissional que irá executar o serviço"
      containerSlotStyle="top: 0; position: relative;"
      containerSlotClass="text-center"
  >

    <b-row>
      <b-col
          xl="12"
          lg="12"
          md="12"
          sm="12"
          v-if="prestadores && prestadores.length == 0"
          class="d-flex align-items-center justify-content-center mt-5 no-services-found"

      >
        <p>Não há profissionais cadastrados, cadastre novos prestadores <b @click="newService()"
                                                                   class="help-new-service">aqui</b></p>
      </b-col>
      <b-col
          xl="4"
          lg="6"
          md="12"
          sm="12"
          v-else
          v-for="prestador in prestadores"
          :key="prestador.id"
          class="container"
          @click="selected(prestador)"
      >
        <b-row align-v="center" class="m-2 p-3 service-container">
          <b-col sm="6" class="p-0">
            <b-img height="100vh" width="100vw" :src="prestador.imgUrl" rounded="circle"
                   alt="Circle image"></b-img>
          </b-col>

          <b-col sm="6">

            <b-col sm="12">
              <b-col
                  sm="12"
                  class="text-start information-container mt-1"
              >
                <h5 class="service-name">{{ prestador.nome }}</h5>

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

export default {
  mixins: [Mixin],
  data: function () {
    return {
      prestadores: [],
      comandaAberta:{}

    }
  },
  async mounted() {
    this.comandaAberta = await this.$getStore("comanda");
    this.getWorkers();
  },

  methods: {

    newService() {
      return this.$router.push({name: 'cadastroprestador'}).catch((e) => {
        console.error(e)
      })
    },

    selected(prestador) {
      console.log(this.comandaAberta, "COMANDA ABERTA SELECAO PR ESTADOR")
       let servico = this.comandaAberta && this.comandaAberta.servico ? this.comandaAberta.servico : undefined;

      this.$setStoreComanda({
        ...this.comandaAberta,
        prestador
      });

      if(servico == undefined){  
        return this.$router.push({name: 'Servicos'}).catch((e) => {
          console.error(e)
        });
      }else{
        return this.$router.push({name: 'Horarios Agendamentos'}).catch((e) => {
          console.error(e)
        })
      };

    },

    getWorkers() {
      // buscar da api

      this.prestadores = [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ebfiw-PKm2DOKadCyaqF9S0wL1yiKQLnXNLWBplte7WyZxTThumvFo0_TKEEPVZ5I_E&usqp=CAU",
          nome: "João",
        },
        {
          id: 2,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHxhl9bfuQEodfzNbK6ceBHBcx6JGrwPsnYL_fUkvGRNqOJ_E9JCpx6DWRqw2eHPtlEY&usqp=CAU",
          nome: "Carlos",
        },
        {
          id: 3,
          imgUrl: "https://media.licdn.com/dms/image/C4E03AQHz95m2JQ0-0w/profile-displayphoto-shrink_800_800/0/1621204890251?e=2147483647&v=beta&t=rELzXHMDy_FemRpUStCAdMxyYf0PyJs1EsZykqXJmbg",
          duracao: "40",
          nome: "Jeferson",
        },
        {
          id: 4,
          imgUrl: "https://media.licdn.com/dms/image/D4D03AQHfLjDYSX2vjw/profile-displayphoto-shrink_800_800/0/1683801270250?e=2147483647&v=beta&t=6lxpHl-d5NH8yI0eEHAUaKhmSW7GL2RqPiY2BV__Q0w",
          nome: "Joaquim",
        },
      ];
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