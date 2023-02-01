  <template>
  <!--  <div>-->
      <Card
          colSM="12"
          colMD="12"
          colLG="12"
          colXL="12"
          v-if="servicos"
          containerSlotStyle="top: 0; position: relative;"
          containerSlotClass="text-center"
      >
        <b-row>
          <b-col
              xl="4"
              lg="6"
              md="12"
              sm="12"
              v-for="servico in servicos"
              :key="servico.id"

          >
            <b-col
                class="main-container">
              <b-col

              >
                <b-img height="50px" src="https://picsum.photos/125/125/?image=58" rounded="circle"
                       alt="Circle image"></b-img>
              </b-col>

              <b-col>
                <h7>{{ servico.nome }}</h7>

              </b-col>
              <b-col>
                <h7>{{ servico.descricao }} minutos</h7>
              </b-col>
              <b-col>

                <h7>{{ servico.duracao }} minutos</h7>

              </b-col>
              <b-col>


                <h7>R${{ servico.valor }}</h7>
              </b-col>
            </b-col>
          </b-col>
        </b-row>
      </Card>
  <!--  </div>-->
  </template>

  <script>
  export default {
    data: function () {
      return {
        servicos: [
          {
            id: "a",
            valor: 30,
            duracao: "30",
            nome: "Corte",
            descricao: "Corte de cabelo utilizando apenas máquina e acabamento na lamina",
            itens: [{
              id: "a1",
              nome: "Lamina",
              quantidade: "1"
            }]

          },
          {
            id: "b",
            valor: 45,
            duracao: "30",
            nome: "Corte com degradê",
            descricao: "Corte de cabelo utilizando tesoura, máquina e acabamento na lamina",
            itens: [{
              id: "a1",
              nome: "Lamina",
              quantidade: "1"
            }]

          }
        ]
      }
    }
  }
  </script>

  <style>
  /*.main-container {*/
  /*  border: 1px solid grey;*/
  /*  border-radius: 20px;*/
  /*  !*margin-top: 1vw;*!*/
  /*  padding: 10px;*/
  /*  cursor: pointer;*/
  /*}*/

  .main-container {
    background-color: #fff;
    color: #373737;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    padding: 30px;
    /*margin:5px;*/
    /*width: auto;*/
  }


  </style>