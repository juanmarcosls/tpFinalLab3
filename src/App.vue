<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <div v-if="$store.state.correcto">
      <router-link to="CompraVenta">Comprar Vender</router-link> |
      <router-link to="/HistorialDeMovimientos">Movimientos</router-link> |
      <router-link to="/MiEstado">Mi Estado</router-link>
    </div>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav {
  padding: 29px;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #0601a0;
}
</style>
