<template>
  <div class="home">
    <div v-if="$store.state.usuario">
      <h1>Bienvenido {{ $store.state.usuario }}</h1>
      <div class="imgcontenedor">
        <router-link to="Compra-Venta"><div class="img compraVenta"></div> </router-link>
        <router-link to="/HistorialDeMovimientos"><div class="img movimientos"></div> </router-link>
        <router-link to="/MiEstado"><div class="img estado"></div> </router-link>
      </div>
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  components: {
    Login,
  },
};
</script>

<style scoped>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1 {
  background: #ffffff;
  text-shadow: 2px 2px 0 #144a0c, 2px -2px 0 #144a0c, -2px 2px 0 #144a0c,
    -2px -2px 0 #144a0c, 2px 0px 0 #144a0c, 0px 2px 0 #144a0c, -2px 0px 0 #144a0c,
    0px -2px 0 #144a0c;
  color: #ffffff;
  background: transparent;
  font-size: 45px;
}
.img {
  width: 95%;
  background: transparent;
  height: 80px;
  padding: 32px;
  margin: 15px;
  image-rendering: auto;
  background-repeat: no-repeat;
  background-position: 0px center;
}

</style>