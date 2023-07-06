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
    <b-col class="pt-3">
      <b-table 
        striped 
        hover 
        :items="items"
        :fields="fields"
        stacked="lg"
        :dark="false"
        borderless
        head-row-variant="light"
      >
      
        <template #cell()="data">
          <b-row  class="text-center custom-row-cells" align-v="center">
            <b-col>
              <p style="vertical-align: middle">{{ data.value }}</p>
            </b-col>
          </b-row>
        </template>

        <template #cell(actions)="row">
          <b-row  style="height: 70px;" class="text-center custom-row-cells" align-v="center">
            <b-col>
              <b-button variant="outline-danger" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Cancelar
              </b-button>
            </b-col>
          </b-row>
        
        </template>

      </b-table>
    </b-col>

  </Card>
</template>

<script>
import Mixin from '../../core/Mixin';

export default {
    mixins: [Mixin],
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
        // Criar get para API de campos e itens da tabela
        this.items = this.$store.getters.getPropriedades.servicosAgendados;
      },

      carregarFieldsTabelaAgendamentos(){
        this.fields = [
          {
            key: 'data',
            sortable: true,
            label: 'Data agendada',
          },
          {
            key: 'servico.nome',
            sortable: false,
            label: 'Serviço',
          },
          {
            key: 'profissional',
            label: 'Profissional',
            sortable: true,
            // variant: 'danger'
          },
          // {
          //   key: 'concluido',
          //   label: 'Concluído',
          //   sortable: true,
          //   // variant: 'danger'
          // },
          
          // menu de acoes
          { key: 'actions', label: '' }
        ]
      }
    },

  
}
</script>

<style>

@media (min-width: 992px){
  .custom-row-cells{
    height: 70px
  }
}


</style>