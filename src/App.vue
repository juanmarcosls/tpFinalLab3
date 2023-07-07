<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <div v-if="$store.state.correcto">|
    <router-link to="/CompraVenta">Compra o vende cryptos aqui</router-link> |
    <router-link to="/HistorialDeMovimientos">Historial de tus compras y ventas</router-link> |
    <router-link to="/MiEstado">Mi estado</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 29px;
}

nav a {
  font-weight: bold;
  color: #1b3c5e;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
