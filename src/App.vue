<template>
  <div id="app">
    <Navbar
      v-if="$route && $route.name != 'Login'"
    />
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
