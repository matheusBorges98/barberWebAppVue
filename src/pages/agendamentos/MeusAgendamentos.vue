<template>
    <Card
      colSM="12"
      colMD="12"
      colLG="12"
      colXL="12"
      titulo="Agendamentos"
      subtitulo="Exibe agendamentos concluídos e em aberto"
      containerSlotStyle="top: 0; position: relative;"
      containerSlotClass="text-center"
    >
    <b-table 
      striped 
      hover 
      :items="items"
      :fields="fields"
      stacked="lg"
      :dark="true"
    >
    
      <template #cell()="data">
        <b-row   style="height: 100px;" class="text-center" align-v="center">
          <b-col>
            <p style="vertical-align: middle">{{ data.value }}</p>
          </b-col>
        </b-row>
      </template>

      <template #cell(actions)="row">
         <b-row   style="height: 100px;" class="text-center" align-v="center">
          <b-col>
            <b-button variant="outline-danger" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              Cancelar
            </b-button>
          </b-col>
        </b-row>
       
      </template>

    </b-table>

  </Card>
</template>

<script>
export default {
    data: function () {
        return {
        items: [],
        fields: [],
      

        }
    },

    mounted() {
      this.carregarItemsTabelaAgendamentos();
      this.carregarFieldsTabelaAgendamentos();
    },

    methods: {
      carregarItemsTabelaAgendamentos(){

        this.items = [
          { data: "01/05/2023 - 09:30", servico: 'Corte', profissional:'Carlos Maia', concluido: 'Não' },
          { data: "23/04/2023 - 09:30", servico: 'Corte', profissional:'Carlos Maia',  concluido: 'Sim' },
        ]
      },

       carregarFieldsTabelaAgendamentos(){

        this.fields = [
          {
            key: 'data',
            sortable: true,
            label: 'Data agendada',
          },
          {
            key: 'servico',
            sortable: false,
            label: 'Serviço',
          },
          {
            key: 'profissional',
            label: 'Profissional responsável',
            sortable: true,
            // variant: 'danger'
          },
          {
            key: 'concluido',
            label: 'Concluído',
            sortable: true,
            // variant: 'danger'
          },
          
          // menu de acoes
          { key: 'actions', label: '' }
        ]
      }
    },

  
}
</script>

<style>

</style>