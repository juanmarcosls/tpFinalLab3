<template>
  <div v-if="$store.state.usuario">
    <h1>Compra y venta de criptomonedas</h1>

    <div class="contenedor">
      <label class="label-css">Comprar/Vender </label>
      <select @change="calcularPrecio" class="select-css" v-model="accion">
        <option disabled value="">Seleccione una opcion</option>
        <option value="sale">Vender</option>
        <option value="purchases">Comprar</option>
      </select>

      <label class="label-css">Criptomoneda </label>
      <select @change="calcularPrecio" class="select-css" v-model="tipo">
        <option disabled value="">Seleccione una opcion</option>
        <option value="bitcoin">bitcoin</option>
        <option value="cardano">cardano</option>
        <option value="ethereum">ethereum</option>
      </select>
      <label class="label-css">Exchange </label>
      <select @change="calcularPrecio" class="select-css" v-model="exchange">
        <option disabled value="">Seleccione una opcion</option>
        <option value="satoshitango">SatoshiTango</option>
        <option value="buenbit">Buenbit</option>
        <option value="criptofacil">CriptoFácil</option>
        <option value="letsbit">Let'sBit</option>
      </select>
      <label class="label-css" id="label3">
        Cantidad
        <input
          @input="calcularPrecio"
          type="number"
          min="1"
          id="input-css"
          v-model="cantidad"
      /></label>
      <p v-if="this.accion === 'sale'" id="mensaje">{{ mensaje }}</p>

      <div v-if="this.cantidad !== ''">
        <p class="msj informacion" v-if="this.accion === 'purchases'">
          Precio de compra: $<b>{{ this.criptoya.totalAsk }}</b>
        </p>
        <p class="msj informacion" v-else>
          Precio de venta: $<b>{{ this.criptoya.totalBid }}</b>
        </p>
      </div>
      <button class="btn first" @click="realizar">realizar</button>
      <div v-if="mensajeCorrecto">
        <p v-if="this.accion === 'purchases'" class="msj realizado">COMPRA EXITOSA</p>
        <p v-else class="msj realizado">VENTA EXITOSA</p>
      </div>
    </div>
  </div>
</template>

<script>
import Servicios from "../services/services.js";
import Precios from "../services/Precios.js";
import moment from "moment";

export default {
  name: "Compra_Venta",
  data() {
    return {
      tipo: "",
      cantidad: "",
      accion: "",
      exchange: "",
      fecha_hora: moment()
        .subtract(1, "days")
        .format("DD-MM-YYYY hh:mm")
        .toLocaleString(),
      fecha: "",
      criptoya: [],
      Movimientos: [],
      cripto: "",
      cantBtc: 0,
      cantAda: 0,
      cantEth: 0,
      mensaje: "",
      msjRealizado: "",
      mensajeCorrecto: false,
    };
  },
  methods: {
    realizar() {
      if (this.accion === "") {
        alert("Error!!! debe seleccionar comprar o vender");
        return;
      }

      if (this.tipo === "") {
        alert(" Error!!! debe ingresar el tipo de criptomoneda que desea Vender");
        return;
      }
      if (this.cantidad === "") {
        alert(
          "Error!!! debe ingresar la cantidad de " +
            this.tipo +
            " que desea comprar/vender"
        );
        return;
      }
      if (this.accion === "sale") {
        if ((this.tipo === "bitcoin") & (this.cantidad > this.cantBtc)) {
          this.mensaje = "Error!!! no tiene esa cantidad de bitcoin para vender";
          return;
        } else if ((this.tipo === "cardano") & (this.cantidad > this.cantAda)) {
          this.mensaje = "Error!!! no tiene esa cantidad de cardano para vender";
          return;
        } else if ((this.tipo === "ethereum") & (this.cantidad > this.cantEth)) {
          this.mensaje = "Error!!! no tiene esa cantidad de ethereum para vender";
          return;
        }
      }

      Servicios.postTransaccion(
        this.$store.state.usuario,
        this.accion,
        this.tipo,
        this.cantidad,
        this.criptoya.totalAsk,
        this.fecha_hora
      )
        .then((respuesta) => {
          console.log(respuesta.data);
          this.mensajeCorrecto = true;
          this.quitarMensje();
          this.LeerTransaccion();
        })
        .catch(() => {
          console.log("Error");
        });
    },
    LeerTransaccion() {
      Servicios.getTransaccion(this.$store.state.usuario)
        .then((respuesta) => {
          this.Movimientos = respuesta.data;
          this.CalcularCantidad();
        })
        .catch(() => {
          console.log("Error");
        });
    },
    CalcularCantidad() {
      (this.cantBtc = 0),
        (this.cantAda = 0),
        (this.cantEth = 0),
        this.Movimientos.forEach((movimiento) => {
          if (movimiento.crypto_code === "bitcoin") {
            if (movimiento.action === "purchases") {
              this.cantBtc += parseFloat(movimiento.crypto_amount);
            } else {
              this.cantBtc -= parseFloat(movimiento.crypto_amount);
            }
          } else if (movimiento.crypto_code === "cardano") {
            if (movimiento.action === "purchases") {
              this.cantAda += parseFloat(movimiento.crypto_amount);
            } else {
              this.cantAda -= parseFloat(movimiento.crypto_amount);
            }
          } else {
            if (movimiento.action === "purchases") {
              this.cantEth += parseFloat(movimiento.crypto_amount);
            } else {
              this.cantEth -= parseFloat(movimiento.crypto_amount);
            }
          }
        });
    },
    quitarMensje() {
      setTimeout(() => {
        this.mensajeCorrecto = false;
        this.accion = "";
        this.tipo = "";
        this.cantidad = "";
        this.exchange = "";
      }, 3500);
    },
  },
  computed: {
    calcularPrecio() {
      switch (this.tipo) {
        case "bitcoin":
          this.cripto = "btc";
          break;
        case "cardano":
          this.cripto = "ada";
          break;
        case "ethereum":
          this.cripto = "eth";
          break;

        default:
          break;
      }

      if ((this.tipo !== "") & (this.cantidad > 0) & (this.exchange !== "")) {
        Precios.getPrecios(this.cripto, this.cantidad, this.exchange)
          .then((respuesta) => {
            this.criptoya = respuesta.data;
          })
          .catch(() => {
            console.log("Error");
          });
      }
    },
  },
  mounted() {
    this.LeerTransaccion();
  },
};
</script>

<style>
.contenedor {
  margin-top: -29px;
  padding: 15px;
  width: 78%;
  height: 450px;
  margin-left: auto;
  margin: auto;
  margin-right: auto;
}
h1 {
  background: #ff0800;
  text-shadow: 2px 2px 0 #00ff15, 2px -2px 0 #00ff15 -2px 2px 0 #00ff15,
    -2px -2px 0 #00ff15, 2px 0px 0 #00ff15, 0px 2px 0 #00ff15, -2px 0px 0 #00ff15,
    0px -2px 0 #00ff15;
  color: #ff0000;
  background: transparent;
  font-size: 45px;
}
.label-css {
  color: rgb(30, 11, 92);
  font-size: 25px;
  font-family: Georgia;
  text-align: left;
  margin-left: -350px;
  margin-right: 100px;
}
#label3 {
  margin-bottom: 15px;
  margin-left: -90px;
  margin-top: 20px;
}
#mensaje {
  margin-top: -6px;
  margin-left: 200px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  color: #d8000c;
}
.msj {
  border: 1px solid;
  background-repeat: no-repeat;
  background-position: 10px center;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
.informacion {
  margin: -3px 240px 0px;
  padding: 1.5px 1.5px 6px 6px;
  font-size: 20px;
  font-style: oblique;

  width: 35%;
  color: #000000;
  background-color: #ffabab;
}
.realizado {
  font-family: "Luckiest Guy", cursive;
  margin: 10px 150px;
  padding: 10px 20px 10px 10px;
  font-size: 17px;
  width: 60%;
  color: #12108a;
  background-color: #83d8ff;
  background-image: url("../assets/tildeverdeCorrecto.jpg");
}
#input-css {
  font-family: "Roboto", sans-serif;
  outline: #1c2aa3;
  background: #f2f2f2;
  width: 200px;
  border: 0.3%;
  margin-top: 15px;
  margin-left: 65px;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 14px;
}
.btn {
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; /* background-color:
transparent; */
  border: 2px solid #ff0000;
  border-radius: 0.6em;
  color: #ff0000;
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
  margin: 20px 300px 0px 430px;
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
.first {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first:hover {
  box-shadow: 0 0 40px 40px #e06666 inset;
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
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight: normal;
}
</style>
