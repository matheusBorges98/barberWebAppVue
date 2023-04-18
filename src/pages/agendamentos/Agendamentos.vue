<template>
  <div>
    <vue-cal
        @cell-click="cellClick"
        small
        active-view="day"
        locale="pt-br"
        :time-from="8 * 60"
        :time-to="20.30 * 60"
        :time-step="30"
        :disable-views="['years', 'year', 'month', 'week']"
        :events="events"
        :cellClickHold="false"
        :on-event-click="eventClick"
    />
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {vueCal: VueCal},
  data: function () {
    return {
      modalDetalhesEvento:false,
      detalhesEvento:{},
      agendamentos: [],
      servicoSelecionado: this.$route.params,
      events: [
        {
          id:"teste",
          start: '2023-02-13 10:30',
          end: '2023-02-13 11:00',
          title: 'Corte degradê',
          // content: '<i class="icon material-icons">shopping_cart</i>',
          class: 'leisure',
          servico:{
            "id": "d",
            "valor": "20,00",
            "imgUrl": "data:image/jpeg;base64,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",
            "duracao": "20",
            "nome": "Barba com toalha quente",
            "descricao": "Barba completa com toalha quente",
            "itens": [
              {
                "id": "a1",
                "nome": "Lamina",
                "quantidade": "1"
              }
            ]
          }
        },
      ]

    }
  },
  mounted() {
    console.log(this.$route.params)
  },
  methods: {
    cellClick(item) {
      console.log(item)
      // this.events.push({
      //   start: '2023-02-13 14:30',
      //   end: '2023-02-13 15:00',
      //   title: 'Barba',
      //   // content: '<i class="icon material-icons">cake</i>',
      //   class: 'sport',
      //
      // })

      if(this.$route.params && this.$route.params.servico){
        return this.$router.push({name: 'Cadastro Agendamento', params: {servico:this.$route.params.servico, horario: this.arredondarTimestampParaBaixo(item)}}).catch((e) => {
          console.error(e)
        })
      }else{
        return this.$router.push({name: 'Servicos', params: {horario: item}}).catch((e) => {
          console.error(e)
        })
      }

    },

    arredondarTimestampParaBaixo(timestamp) {
      const d = new Date(timestamp);
      const minutos = d.getMinutes();
      const minutosArredondados = Math.floor(minutos / 30) * 30;
      d.setMinutes(minutosArredondados, 0, 0);
      return d.getTime();
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
.vuecal__cell{
  font-size:12px !important;
}

//Exibe ou não seletor do tipo de visão do calendario
.vuecal__menu{
  display:none !important;
}
</style>