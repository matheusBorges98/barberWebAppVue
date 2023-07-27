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
  <!-- A FAZER
    Fazer o servico pegar o proximoServico pela data mais proxima da data atual.
    Evoluir visual
    utilizar API
   -->
    <b-col
      cols="12"
      style="height:20vh; background-color:white"
      v-if="proximoAgendamento && proximoAgendamento.servico"
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
              <b-img height="100px" width="100px" :src="proximoAgendamento.servico.imgUrl" rounded="circle"
                     alt="Circle image"></b-img>
            </b-col>

            <b-col sm="10">

              <b-col sm="12">
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <h5 class="service-name">{{ proximoAgendamento.servico.nome }}</h5>

                </b-col>
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <p class="service-description">{{ proximoAgendamento.servico.descricao }} </p>
                </b-col>
                <b-col
                    sm="12"
                    class="text-start information-container"
                >
                  <b-row>
                    <b-col sm="4">
                      <h6 class="service-details">{{ proximoAgendamento.servico.duracao }} minutos |
                          {{humanizarTimestamp(proximoAgendamento.data)}}
                        <b-icon icon="clock-fill"></b-icon>
                      </h6>
                    </b-col>
                    <b-col sm="4">
                      <h6 class="service-details">R${{ proximoAgendamento.servico.valor }} </h6>
                    </b-col>
                     <b-col sm="4">
                      <h6 class="service-details">Responsável: <b> {{ proximoAgendamento.profissional }} </b> </h6>
                    </b-col>
                    <!-- <b-col class="mt-5" sm="12">
                      <h5 class="service-date-humanized">Horário agendado:
                        {{humanizarDateString(proximoAgendamento.data)}} <b-icon icon="clock-fill"></b-icon></h5>
                    </b-col> -->
                  </b-row>

                </b-col>

              </b-col>
            </b-col>
          </b-row>
        </b-col>

      </b-row>

    </b-col>

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
        proximoAgendamento : {}
      }
    },

    mounted() { 
      this.carregarItemsTabelaAgendamentos();
      this.carregarFieldsTabelaAgendamentos();
      this.carregarProximoServicoAgendado();
    },

    methods: {
      carregarItemsTabelaAgendamentos(){
        // Criar get para API de campos e itens da tabela
        this.items = this.$store.getters.getPropriedades.servicosAgendados;
      },

      carregarProximoServicoAgendado(){
        if(this.items && this.items.length > 0){
          this.proximoAgendamento = this.items[0];
        };
        // TO DO:
          // Pegar servico pela data mais proxima da data atual.
        console.log("proximoAgendamento", this.proximoAgendamento)
      },

      carregarFieldsTabelaAgendamentos(){
        this.fields = [
          {
            key: 'data',
            sortable: true,
            label: 'Data agendada',
            formatter: this.humanizarTimestamp
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