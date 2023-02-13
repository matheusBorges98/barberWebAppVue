<template>
  <div>
    <p>Agendamentos</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      agendamentos: []

    }
  },
  mounted() {
    console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>

</style>