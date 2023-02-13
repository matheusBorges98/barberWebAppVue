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
      agendamentos: [],
      events: [
        {
          id:"teste",
          start: '2023-02-13 10:30',
          end: '2023-02-13 11:00',
          title: 'Reservado',
          // content: '<i class="icon material-icons">shopping_cart</i>',
          class: 'leisure'
        },
        {
          start: '2023-02-13 11:00',
          end: '2023-02-13 11:30',
          title: 'Reservado',
          // content: '<i class="icon material-icons">golf_course</i>',
          class: 'sport'
        },
        {
          start: '2023-02-13 11:30',
          end: '2023-02-13 12:00',
          title: 'Reservado',
          // content: '<i class="icon material-icons">cake</i>',
          class: 'sport'
        }
      ]

    }
  },
  mounted() {
    console.log(this.$route.params)
  },
  methods: {
    cellClick(item) {
      console.log(item)
      this.events.push({
        start: '2023-02-13 14:30',
        end: '2023-02-13 15:00',
        title: 'Barba',
        // content: '<i class="icon material-icons">cake</i>',
        class: 'sport'
      })
    },

    eventClick(item){
      console.log(item)
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