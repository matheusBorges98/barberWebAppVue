<template>
  <div>
    <Card
        colSM="12"
        colMD="12"
        colLG="12"
        colXL="12"

        containerSlotClass="text-center"
        titulo="Novo agendamento"
        subtitulo="Confirme o horário e serviço agendado."
    >

    <b-row>
        <b-col
            xl="12"
            lg="12"
            md="12"
            sm="12"
            class="mt-1"
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
                    <b-col sm="12">
                      <h5 class="service-date-humanized">Horário agendado:
                        {{this.humanizarTimestamp(comandaAberta.horario)}} <b-icon icon="clock-fill"></b-icon></h5>
                    </b-col>
                  </b-row>

                </b-col>

                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <!-- <b-row>
                    <ListaCamposPersonalizados
                      :itens="montarCamposPersonalizados()"
                      :esconderChaves="['id']"
                      tagTexto="h6"
                    />
                  </b-row> -->

                </b-col>

              </b-col>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" style="margin-top:5vh">
          <b-row class="text-center" style="align-content: space-between;">
            <b-col cols="12">
              <b-button variant="outline-primary" class="col-12" v-on:click="enviarAgendamento()">
                Confirmar Agendamento
                <b-icon icon="bookmark-check-fill"></b-icon>
              </b-button>
            </b-col>

            <b-col cols="12" style="margin-top:10px">
              <b-button variant="outline-dark" class="col-12" v-on:click="voltar()">
                Voltar
                <b-icon icon="arrow-return-left"></b-icon>
              </b-button>
            </b-col>

          </b-row>
        </b-col>
      </b-row>
    </Card>
  </div>
</template>

<script>
import Mixin from '../../core/Mixin';
import api from "../../http/index"

export default {
  mixins: [Mixin],
  data: function (){
    return{
      servico:{},
      horarioAgendamento:"",
      prestador:{},
      dataFormatada:"",
      listaServico:[],
      comandaAberta:{}
    }
  },
  async mounted() {
    this.comandaAberta =  await this.$getStore("comanda");
    this.servico = this.comandaAberta?.servico
    this.prestador = this.comandaAberta?.prestador;

    console.log(this.comandaAberta, "COMANDA ABERTA FINALIZACAO")
  },

  methods:{

    async montarCamposPersonalizados(){
      return [
       {
        profissional : this.comandaAberta?.prestador?.nome,
        observacao:"Dia do noivo"
       }
      ]
    },

    montarObjetoProdutos(produtos){
      let objetoMontado = [];

      produtos.map((item)=>{
        objetoMontado.push({
          id: item.id,
          price: item?.preco ?? 0
        })
      });

      return objetoMontado;
    },

    montarObjetoServico(servico){
      let objetoMontado = [];

      objetoMontado.push({
        id: servico.id,
        price: parseFloat(servico.valor),
        duration: parseInt(servico.duracao),
      });

      return objetoMontado;
    },

    async enviarAgendamento(){

      const dadosAgendamento = {
        situation: this.comandaAberta.concluido,
        discount: 0,
        total: parseFloat(this.comandaAberta.servico.valor),
        customerId: this.$store.getters.getPropriedades?.dadosUsuarioLogado?.user.account.id ,
        professionalId: this.comandaAberta.prestador.id,
        services: this.montarObjetoServico(this.comandaAberta.servico),
        products: this.montarObjetoProdutos(this.comandaAberta.servico.itens),
        scheduledDate:new Date(this.comandaAberta.horario),
        headquarterId: 1
      };

      await api({
        method: 'post',
        url:  `/schedules`,
        data: {
          schedule:{
            ...dadosAgendamento
          }
        },
        headers:{
          ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
          client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
          uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
        }
      });
    
      //Monta ficticio usando store
      let dadosAgendadosStore = this.$store.getters.getPropriedades?.servicosAgendados ?? [];
      dadosAgendadosStore.push(dadosAgendamento)
      this.$setStoreServicosAgendados(dadosAgendadosStore);

      this.$notify({
        title: 'Novo agendamento',
        text: `
                <p>O seu agendamento foi confirmado para <b> ${this.humanizarTimestamp(this.comandaAberta.horario)}</b>.</p>
                <b> ${ this.dataFormatada }</b>
        `,
        duration:5000
      });

      this.$clearStore("comanda");

      return this.$router.push({name: 'Meus Agendamentos', params: {}}).catch((e) => {
        this.$clearStore("comanda");
        console.error(e)
      })
    },

    voltar(){
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
.service-container{
  height: 100%;
}

@media (max-width: 992px){
  .service-container {
    min-height: 65vh;
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

.service-container:hover{
  transform: scale(1.06);
  //border-bottom:rgb(0, 96, 177) 2px solid;

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

.service-date-humanized {
  font-size: 16px;
  font-weight: 600;
}
</style>