<template>
  <div class="imgLogin">
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="Ingrese su usuario aquí" v-model="nuevoUsuario" />
        <p id="mensaje_1">{{ mensaje }}</p>
      </form>
      <button v-on:keydown.enter="Ingresar" @click="Ingresar">Ingresar</button>
    </div>
  </div>
  </div>

</template>
<script>
export default {
  name: "Login",
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
  color: #4e502c;
}

#nav a.router-link-exact-active {
  color: #2187a7;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.imgLogin{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/criptomonedas.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.form {
  position: relative;
  z-index: 1;
  background: #00084d;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #c0bd25;
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
  background: #c0bd25;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #000000;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #666666;
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