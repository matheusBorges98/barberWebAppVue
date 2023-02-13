<template>
  <div id="app">
    <Navbar
        v-if="$route && $route.name != 'Login'"
    />
    <b-row v-if="$route && $route.name != 'Login'" class="container-route-name">
      <b-col class="text-center p-1">
        <h6 class="route-name">{{ $route.name }}
          <b-icon icon="file-break-fill"></b-icon>
        </h6>
      </b-col>
    </b-row>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Verdana, Geneva, sans-serif;
  color: #282A35;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.container-route-name {
  color: #f2f2f2;
  background-color: rgb(0, 96, 177);
}

.route-name{
  font-weight: 540;
}

</style>
