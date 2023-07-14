<template>
    <div v-if="Edicion === false">
      <div class="editcontenedor" v-if="movimiento !== null">
        <ul>
          <li>id:{{ movimiento._id }}</li>
          <li>Usuario: {{ movimiento.user_id }}</li>
          <li>accion:{{ movimiento.action }}</li>
          <li>tipo: {{ movimiento.crypto_code }}</li>
          <li>cantidad:{{ movimiento.crypto_amount }}</li>
          <li>costo: ${{ movimiento.money }}</li>
          <li>fecha-hora: {{ movimiento.datetime }}</li>
        </ul>
        <button class="btn second" id="editar1" @click="Editar">Editar</button
        ><router-link to="/Movimientos">
          <button class="btn first" id="eliminar" @click="Eliminar">
            Eliminar
          </button></router-link
        >
      </div>
    </div>
  
    <div class="editcontenedor" v-if="Edicion">
      <label class="label-css">Comprar/Vender </label>
      <select class="select-css" v-model="movimiento.action">
        <option disbled value="">Comprar/Vender</option>
        <option value="sale">Vender</option>
        <option value="purchases">Comprar</option>
      </select>
  
      <label class="label-css">Criptomoneda </label>
      <select class="select-css" v-model="movimiento.crypto_code">
        <option disabled value="">Criptomoneda</option>
        <option>bitcoin</option>
        <option>ethereum</option>
        <option>cardano</option>
      </select>
      <br />
      <br />
      <label class="label-css" id="label3">
        Cantidad <input id="input-css" type="number" v-model="movimiento.crypto_amount"
      /></label>
      <button class="btn second" @click="EditarTransaccion">Editar</button>
  
      <button @click="Cancelar" class="btn first" id="cancelar">Cancelar</button>
    </div>
  </template>
  
  <script>
  import Servicios from "../services/services.js";
  export default {
    props: {
      id: {
        require: true,
      },
    },
    data() {
      return {
        movimiento: null,
        Edicion: false,
      };
    },
    methods: {
      Eliminar() {
        Servicios.deleteTransaccion(this.id)
          .then((respuesta) => {
            console.log("se elimino correctamente");
          })
          .catch(() => {
            console.log("Error");
          });
      },
      Editar() {
        this.Edicion = true;
      },
      Cancelar() {
        this.Edicion = false;
      },
      EditarTransaccion() {
        Servicios.patchTransaccion(
          this.id,
          this.movimiento.action,
          this.movimiento.crypto_code,
          this.movimiento.crypto_amount,
          this.movimiento.money
        )
          .then((respuesta) => {
            console.log(respuesta.data);
          })
          .catch(() => {
            console.log("Error");
          });
  
        this.Edicion = false;
      },
    },
    created() {
      Servicios.getTransaccionId(this.id)
        .then((respuesta) => {
          this.movimiento = respuesta.data;
        })
        .catch(() => {
          console.log("Error");
        });
    },
  };
  </script>
  <style scoped>
  .editcontenedor {
    padding: 15px;
    width: 78%;
    height: 450px;
    margin-left: auto;
    margin: auto;
    margin-right: auto;
    margin-top: 35px;
  }
  
  ul {
    list-style: none;
    margin-top: 20px;
  }
  li {
    margin: 10px;
    font-family: "Times New Roman", Times, serif;
    font-size: 20px;
  }
  
  .btn {
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; /* background-color:
  transparent; */
    border: 2px solid #246e07;
    border-radius: 0.6em;
    color: #246e07;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px 300px;
    padding: 0.8em 1.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }
  .btn:hover,
  .btn:focus {
    color: #000000;
    outline: 0;
  }
  .first,
  .second {
    -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  .first:hover {
    box-shadow: 0 0 40px 40px #27a301 inset;
  }
  .second {
    border: 2px solid #001aff;
    color: #001aff;
  }
  
  .second:hover {
    box-shadow: 0 0 40px 40px #8bb0f3 inset;
  }
  #cancelar {
     margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  }
  #eliminar {
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  }
  #editar1 {
      margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  }
  #input-css {
    font-family: "Roboto", sans-serif;
    outline: #a3681c;
    background: #e6dfdf;
    width: 200px;
    border: 0.3%;
    margin-top: 15px;
    margin-left: 65px;
    margin-bottom: 10px;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
  }
  #label3 {
    margin-bottom: 15px;
    margin-left: -90px;
    margin-top: 20px;
  }
  .select-css {
    display: block;
    font-size: 15px;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    color: #444;
    line-height: 1.3;
    padding: 0.1em 1.2em 0.3em 0.5em;
    width: 185px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-top: 15px;
    margin-left: 375px;
    margin-right: 150px;
    margin-bottom: 10px;
  
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
    border-radius: 0.3em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .select-css::-ms-expand {
    display: none;
  }
  .select-css:hover {
    border-color: #888;
  }
  .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(252, 59, 59, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .select-css option {
    font-weight: normal;
  }
  .label-css {
    color: rgb(11, 92, 18);
    font-size: 25px;
    font-family: Georgia;
    text-align: left;
    margin-left: -350px;
    margin-right: 100px;
  }
  </style>