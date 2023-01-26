<template>
  <div>
    <Card
        colSM="12"
        colMD="12"
        colLG="12"
        colXL="12"
        v-if="servicos"
        containerSlotStyle="top: 5vh; position: relative;"
        containerSlotClass="text-center"
    >
      <b-row
          v-for="servico in servicos"
          :key="servico.id"
          class="main-container"
      >

        <b-col md="2">
          <h5>{{ servico.nome }}</h5>

        </b-col>
        <b-col md="6">
          <h5>{{ servico.descricao }} minutos</h5>
        </b-col>
        <b-col md="2">

          <h5>{{ servico.duracao }} minutos</h5>

        </b-col>
        <b-col md="2">


          <h5>R${{ servico.valor }}</h5>
        </b-col>
      </b-row>
    </Card>
  </div>
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
          id: "a",
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
  border: 1px solid red;
  top:2vw;
}
</style>