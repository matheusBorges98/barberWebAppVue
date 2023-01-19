<template>
  <div id="app">
    <Navbar
      v-if="$route && $route.name != 'Login'"
    />  
      <router-view/>
  </div>
</template>

<style lang="scss">
  #app{
    padding:0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

</style>
