<template>
  <div id="app">
    <Navbar
      v-if="$route && $route.name != 'Login'"
    />

    <router-view
      v-if="$route && $route.name == 'Login'"
    />
  </div>
</template>

<style lang="scss">

</style>
