<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="usuario" v-model="nuevoUsuario" />
        <p id="mensaje_1">{{ mensaje }}</p>
      </form>
      <button @click="Ingresar">Ingresar</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      nuevoUsuario: "",
      nuevoCorrecto: true,
      mensaje: "",
    };
  },
  methods: {
    Ingresar() {
      if (this.nuevoUsuario === "") {
        this.mensaje = "Error.. debe ingresar un usuario";
        return;
      } else {
        this.$store.commit("setUsuario", this.nuevoUsuario);
        this.$store.commit("setCorrecto", this.nuevoCorrecto);
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
#mensaje_1 {
  margin-top: -5px;
  margin-left: -29px;
  margin-bottom: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  color: #d8000c;
}
</style>