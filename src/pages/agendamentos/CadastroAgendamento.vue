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
        <ListCard
          :itens="montarServico()"
        />
        
      </b-row>

      <b-row>

        <b-col cols="12" class="mt-3">
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
import axios from "axios";

export default {
  mixins: [Mixin],
  data: function (){
    return{
      servico:{},
      horarioAgendamento:"",
      prestador:{},
      dataFormatada:"",
      listaServico:[]
    }
  },
  mounted() {
    console.log(this.$route.params, "Cadastro agendamento")
    this.servico = this.$route.params.servico;
    this.horarioAgendamento = this.$route.params.horario;
    this.prestador = this.$route.params.prestador;
  
    // this.humanizedDateString(this.horarioAgendamento);
  },

  methods:{

    montarServico(){
      return [
        {
        servico : this.servico,
        data: this.horarioAgendamento,
        usuario: {},
        empresa: "id_empresa",
        prestador: this.prestador,
        concluido: false
      },
      {
        servico : this.servico,
        data: this.horarioAgendamento,
        usuario: {},
        empresa: "id_empresa",
        prestador: this.prestador,
        concluido: true
      }
      ]
    },

    async enviarAgendamento(){
      
      const dadosAgendamento = {
        servico : this.servico,
        data: this.horarioAgendamento,
        usuario: {},
        empresa: "id_empresa",
        prestador: this.prestador,
        concluido: false
      }

      // const url = 'https://exemplo.com/api/endpoint'; 
      // let response = await axios.post(url, dadosAgendamento)

    
      //Monta ficticio usando store
      let dadosAgendadosStore = this.$store.getters.getPropriedades?.servicosAgendados ?? [];
      dadosAgendadosStore.push(dadosAgendamento)
      this.$setStoreServicosAgendados(dadosAgendadosStore);

      this.$notify({
        title: 'Novo agendamento',
        text: `
                <p>O seu agendamento foi confirmado para <b> ${this.humanizarTimestamp(this.horarioAgendamento)}</b>.</p>
                <b> ${ this.dataFormatada }</b>
        `,
        duration:5000
      });

      this.$router.push({name: 'Meus Agendamentos', params: {}}).catch((e) => {
        console.error(e)
      })
    },

    // getWeekDayName(date){
    //   let timestamp = new Date(date)
    //   const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    //   const nomeDia = diasSemana[timestamp.getDay()];

    //   return nomeDia;
    // },

    // humanizedDateString(dateString){
    //   const nDate = new Date(dateString);
    //   const diaMesAno = nDate.toLocaleDateString();
    //   const hora = nDate.toLocaleTimeString();

    //   this.dataFormatada = `${diaMesAno} - ${hora}`;
    // },

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