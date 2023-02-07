<template>
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
          xl="6"
          lg="6"
          md="12"
          sm="12"
          v-for="servico in servicos"
          :key="servico.id"
          class="container"
      >
        <b-row align-v="center" class="m-1 p-3 service-container">
          <b-col sm="2" class="p-1">
            <b-img height="80px" src="https://picsum.photos/125/125/?image=58" rounded="circle"
                   alt="Circle image"></b-img>
          </b-col>

          <b-col sm="10">

            <b-col sm="12">
              <b-col
                  sm="12"
                  class="text-start information-container"
              >
                <h5>{{ servico.nome }}</h5>

              </b-col>
              <b-col
                  sm="12"
                  class="text-start information-container"
              >
                <p>{{ servico.descricao }} minutos</p>
              </b-col>
              <b-col
                  sm="12"
                  class="text-start information-container"
              >

                <h6>{{ servico.duracao }} minutos</h6>

              </b-col>
              <b-col
                  class="text-start information-container"
                  sm="12">


                <h6>R${{ servico.valor }}</h6>
              </b-col>
            </b-col>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </Card>
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

.information-container :hover {
  font-weight: 700;
}

.service-container {
  background-color: white;
  /*border-radius: 20px;*/
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
}


</style>