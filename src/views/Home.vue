<template>
  <div class="home">
    <div v-if="$store.state.usuario">
      <h1>Bienvenido {{ $store.state.usuario }}</h1>
      <div class="imgcontenedor">
        <router-link to="CompraVenta"><div class="img compraVenta"></div> </router-link>
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
  text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000, -2px 0px 0 #000000,
    0px -2px 0 #000000;
  color: #ffffff;
  background: transparent;
  font-size: 45px;
}
.img {
  width: 93%;
  background: transparent;
  height: 200px;
  padding: 2px;
  margin: 1px;
  image-rendering: auto;
  background-repeat: no-repeat;
  background-position: 0px center;
}
.compraVenta {
  background-image: url("../assets/compraventa.jpeg");
}
.movimientos {
  background-image: url("../assets/movimientos.jpeg");
}
.estado {
  background-image: url("../assets/miestado.jpeg");
}

</style>