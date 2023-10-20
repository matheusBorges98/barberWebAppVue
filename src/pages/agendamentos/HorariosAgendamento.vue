<template>
  <div>
    <vue-cal
      class="vuecal--green-theme"
      @cell-click="cellClick"
      small
      :active-view=" this.isMobile() ? 'day' : 'day'"
      locale="pt-br"
      :time-from="8 * 60"
      :time-to="20.30 * 60"
      :time-step="30"
      :disable-views="['years', 'year', 'month']"
      :events="events"
      :cellClickHold="false"
      :on-event-click="eventClick"
      show-time-in-cells
      today-button
      events-count-on-year-view
      :minDate="new Date()"
      :time-cell-height="60"
      :split-days="customDaySplitLabels"
      sticky-split-labels
    >
      <template #split-label="{ split }">
        <strong :style="`color: ${split.color}`">{{ split.label }}</strong>
      </template>

    </vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import Mixin from '../../core/Mixin';
import api from "../../http/index"

export default {
  mixins: [Mixin],
  components: {vueCal: VueCal},
  data: function () {
    return {
      modalDetalhesEvento:false,
      detalhesEvento:{},
      agendamentos: [],
      servicoSelecionado: this.$route.params,
      comandaAberta:{},
      //Deve pegar do banco o id baseado nos prestadores. apenas Visao gerencial verá isso
      customDaySplitLabels: this.isAdmin() ? [
        { label: 'João', color: 'blue', class: 'split1', id:1},
        { label: 'Carlos', color: 'green', class: 'split2', id:2 },
        { label: 'Jeferson', color: 'orange', class: 'split3', id:3 },
        { label: 'Joaquim', color: 'red', class: 'split4', id:4 }
      ] : [],

  // TO DO PEGAR CUSTOM SPLIT com base no professionalId Vinculado ao servico e entao montar a lista.
//  customDaySplitLabels:  [
      //   { label: 'João', color: 'blue', class: 'split1', id:1},
      //   { label: 'Carlos', color: 'green', class: 'split2', id:2 },
      //   { label: 'Jeferson', color: 'orange', class: 'split3', id:3 },
      //   { label: 'Joaquim', color: 'red', class: 'split4', id:4 }
      // ],

      events: []

    }
  },
  async mounted() {
    await this.carregarItemsTabelaAgendamentos();

    this.comandaAberta = await this.$getStore("comanda");
  },
  methods: {
    async carregarItemsTabelaAgendamentos(){

      let retorno =  await api({
        method: 'GET',
        url:  `/schedules`,
        headers:{
          ["access-token"] : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.accessToken ?? "",
          client : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.client ?? "",
          uid : this.$store.getters.getPropriedades?.dadosUsuarioLogado?.uid ?? ""
        }
      });

      this.events = this.montaObjetoAgendamentos(retorno.data.schedules);
    },

    montaObjetoAgendamentos(agendamentos){
      let retorno = [];

      agendamentos.map((agendamento)=>{
        // if(agendamento.)
        retorno.push({
            id: agendamento.id,
            start: this.formatarTimestampDataInicio(agendamento.scheduledDate),
            end: this.formatarTimestampDataFim(agendamento.scheduledDate, agendamento.services[0]?.duration ?? 30),
            title: agendamento.services[0]?.name ?? "",
            split: agendamento.professionalId,
            // content: '<i class="icon material-icons">shopping_cart</i>',
            class: 'closed',
            servico:{
              ...agendamento.services[0]
            }
            
        })
      });

      return retorno
    },

    formatarTimestampDataInicio(timestamp) {
      const data = new Date(timestamp);
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      const hora = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');

      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },

    formatarTimestampDataFim(timestamp, duracaoMinutos) {
      const data = new Date(timestamp);
      data.setTime(data.getTime() + duracaoMinutos * 60 * 1000);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      const hora = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');

      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },

    cellClick(item) {
      const horaFormatada = this.arredondarTimestampParaBaixo(item);
      const horarioSelecionado = new Date(horaFormatada);
      const dataAtual = new Date();

      let servico = this.comandaAberta && this.comandaAberta.servico ? this.comandaAberta.servico : undefined ;
      console.log(servico, "SERVICO NO HORARIO AGENDAMENTO")
     if (horarioSelecionado > dataAtual) {
        if ( servico && servico != undefined ) {
          this.$setStoreComanda({
            ...this.comandaAberta,
            horario: horaFormatada,
            split:1,
            data: '',
          });

          return this.$router.push({name: 'Cadastro Agendamento'}).catch((e) => {
            console.error(e);
          });

        } else if(servico == undefined) {
             this.$setStoreComanda({
              ...this.comandaAberta,
              horario: horaFormatada,
              split:1,
            });

            return this.$router.push({ name: 'Servicos' }).catch((e) => {
              console.error(e);
            });
        }
      } else {
        this.$notify({
          title: 'Não é possível selecionar este horário',
          text: `
                  <p>O horário selecionado é menor que a data atual.</p>
          `,
          duration:5000
        });
      }
    },

    eventClick(evento){
      console.log(evento);
      return this.$router.push({name: 'Detalhes Agendamento', params: {evento: evento}}).catch((e) => {
        console.error(e)
      })
    }

  }
}
</script>

<style lang="scss">
.vuecal .day-split-header {font-size: 11px;}
.vuecal__body .split1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .split2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .split3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .split4 {background-color: rgba(255, 235, 238, 0.7);}
.vuecal__no-event {display: none;}

.vuecal__cell--disabled {text-decoration: line-through;}
.vuecal__cell--before-min {color: #b6d6c7;}
.vuecal__cell--after-max {color: #008b8b;}

.closed{
  // border: 2px solid green;
  background-color: #e4f5ef;
  border: 1px solid #8787873a;
}

.opened{
  // border: 2px solid green;
  background-color: #e4f5ef;
  border: 1px solid #8787873a;
}

.pending{
  // border: 2px solid green;
  background-color: #f4f1bd;
  border: 1px solid #8787873a;
}

.vuecal__event-title{
  font-size: 15px;
  cursor: pointer;
}
// .vuecal__event-time{
//     // font-size: 15px
//     display: none;
// }

.vuecal__no-event {
    /* padding-top: 1em; */
    color:#42b983;// #aaa;
    justify-self: middle;
    margin-bottom: auto;
    font-size: 15px;
    display: none;
}

.vuecal__cell{
  // background-color:#42b983;// #aaa;
  font-size:12px !important;
}

.vuecal__event .closed{
  vertical-align: middle;
}

//Exibe ou não seletor do tipo de visão do calendario
// .vuecal__menu{
//   display:none !important;
// }
</style>