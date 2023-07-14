<template>
  <div>
    <h1 id="miestado">Mi Estado</h1>
    <router-link
      :to="{
        name: 'AnalisisDeInversion',
        params: {
          precioBtc: this.precioBtc,
          precioAda: this.precioAda,
          precioEth: this.precioEth,
          bitcoin: this.cantBtc,
          cardano: this.cantAda,
          ethereum: this.cantEth,
        },
      }"
    >
      <button class="blue">Ver Inversiones</button>
    </router-link>

    <div class="limitador">
      <div class="contenedor-table100">
        <div class="-wrap-table100">
          <div class="table100 ver3 m-b-110">
            <table data-vertable="ver3">
              <thead>
                <tr class="fila100 head">
                  <th class="columna100 columna1" data-column="columna1">Criptomoneda</th>
                  <th class="columna100 column2" data-column="column2">Cantidad</th>
                  <th class="columna100 column3" data-column="column3">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="this.cantBtc > 0" class="fila100">
                  <td class="columna100 columna1" data-column="columna1">Bitcoin</td>
                  <td class="columna100 column2" data-column="column2">
                    {{ this.cantBtc }}
                  </td>
                  <td class="columna100 column3" data-column="column3">
                    <select
                      v-model="exchange"
                      @change="CalcularPrecio('btc', this.cantBtc, this.exchange)"
                      class="selector-exchange"
                    >
                      <option value="satoshitango">SatoshiTango</option>
                      <option value="buenbit">Buenbit</option>
                      <option value="criptofacil">CriptoFácil</option>
                      <option value="letsbit">Let'sBit</option>
                    </select>
                    ${{ this.precioBtc.toFixed(2) }}
                  </td>
                </tr>
                <tr v-if="this.cantAda > 0" class="fila100">
                  <td class="columna100 columna1" data-column="columna1">Cardano</td>
                  <td class="columna100 column2" data-column="column2">
                    {{ this.cantAda }}
                  </td>
                  <td class="columna100 column3" data-column="column3">
                    <select
                      @change="CalcularPrecio('ada', this.cantAda, this.exchange1)"
                      class="selector-exchange"
                      v-model="exchange1"
                    >
                      <option value="satoshitango">SatoshiTango</option>
                      <option value="buenbit">Buenbit</option>
                      <option value="criptofacil">CriptoFácil</option>
                      <option value="letsbit">Let'sBit</option>
                    </select>
                    ${{ this.precioAda.toFixed(2) }}
                  </td>
                </tr>
                <tr v-if="this.cantEth > 0" class="fila100">
                  <td class="columna100 columna1" data-column="columna1">Ethereum</td>
                  <td class="columna100 column2" data-column="column2">
                    {{ this.cantEth }}
                  </td>
                  <td class="columna100 column3" data-column="column3">
                    <select
                      @change="CalcularPrecio('eth', this.cantEth, this.exchange2)"
                      class="selector-exchange"
                      v-model="exchange2"
                    >
                      <option value="satoshitango">SatoshiTango</option>
                      <option value="buenbit">Buenbit</option>
                      <option value="criptofacil">CriptoFácil</option>
                      <option value="letsbit">Let'sBit</option>
                    </select>
                    ${{ this.precioEth.toFixed(2) }}
                  </td>
                </tr>
                <tr class="fila100">
                  <td class="columna100 columna1" data-column="columna1">Total</td>
                  <td class="columna100 column2" data-column="column2">
                    {{ this.totalCant }}
                  </td>
                  <td class="columna100 column3" data-column="column3">
                    ${{ this.totalPrecio.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Servicios from "../services/services.js";
import Precios from "../services/Precios.js";
export default {
  data() {
    return {
      Movimientos: [],
      precio: [],
      cantBtc: 0,
      cantAda: 0,
      cantEth: 0,
      precioBtc: 0,
      precioAda: 0,
      precioEth: 0,
      totalPrecio: 0,
      totalCant: 0,
      exchange: "satoshitango",
      exchange1: "satoshitango",
      exchange2: "satoshitango",
    };
  },
  methods: {
    CalcularCantidad() {
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

      this.totalCant = this.cantBtc + this.cantAda + this.cantEth;

      if (this.cantBtc > 0) {
        this.CalcularPrecio("btc", this.cantBtc, this.exchange);
      }
      if (this.cantAda > 0) {
        this.CalcularPrecio("ada", this.cantAda, this.exchange1);
      }
      if (this.cantEth > 0) {
        this.CalcularPrecio("eth", this.cantEth, this.exchange2);
      }
    },
    CalcularPrecio(cripto, cantidad, exchange) {
      Precios.getPrecios(cripto, cantidad, exchange)
        .then((respuesta) => {
          this.precio = respuesta.data;
          if (cripto === "btc") {
            this.precioBtc = this.precio.totalBid;
          }
          if (cripto === "ada") {
            this.precioAda = this.precio.totalBid;
          }
          if (cripto === "eth") {
            this.precioEth = this.precio.totalBid;
          }
          this.totalPrecio += parseFloat(this.precio.totalBid);
        })
        .catch(() => {
          console.log("Error");
        });
    },
  },
  mounted() {
    Servicios.getTransaccion(this.$store.state.usuario)
      .then((respuesta) => {
        this.Movimientos = respuesta.data;
        this.CalcularCantidad();
      })
      .catch(() => {
        console.log("Error");
      });
  },
};
</script>
<style>
#miestado {
  background: #e5ff00;
  text-shadow: 2px 2px 0 #003cff, 2px -2px 0 #003cff, -2px 2px 0 #003cff,
    -2px -2px 0 #003cff, 2px 0px 0 #003cff, 0px 2px 0 #003cff, -2px 0px 0 #003cff,
    0px -2px 0 #003cff;
  color: #ffffff;
  background: transparent;
  font-size: 45px;
}
.limitador {
  width: 100%;
  margin: 0 auto;
}

.contenedor-table100 {
  width: 97%;
  min-height: 0.5vh;
  background: transparent;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}

.-wrap-table100 {
  width: 1300px;
}

table {
  width: 100%;
  background-color: #0f3dbb;
}

th,
td {
  font-weight: unset;
  padding-right: 10px;
}

.columna100 {
  width: 130px;
  padding-left: 25px;
}

.columna100.columna1 {
  width: 265px;
  padding-left: 42px;
}

.fila100.head th {
  padding-top: 24px;
  padding-bottom: 20px;
}

.fila100 td {
  padding-top: 18px;
  padding-bottom: 14px;
}
.table100.ver3 tbody tr {
  border-bottom: 1px solid #e5e5e5;
}

.table100.ver3 td {
  font-family: Montserrat-Regular;
  font-size: 14px;
  color: #000000;
  line-height: 1.4;
}

.table100.ver3 th {
  font-family: Montserrat-Medium;
  font-size: 12px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #001eff;
}

.table100.ver3 .fila100:hover td {
  background-color: #98f1f7;
}

.table100.ver3 .hov-column-ver3 {
  background-color: #ff0000;
}

.table100.ver3 .hov-column-head-ver3 {
  background-color: #001eff !important;
}

.table100.ver3 .fila100 td:hover {
  background-color: #98f1f7;
  color: #0004ff;
}
.blue {
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; /* background-color:
transparent; */
  border: 2px solid #001eff;
  border-radius: 0.6em;
  color: #001efd;
  cursor: pointer;
  display: flex;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin-left: auto;
  margin-right: auto;
  margin-top: -15px;
  margin-bottom: -15px;
  padding: 0.8em 1.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
.blue:hover,
.blue:focus {
  color: #fff;
  outline: 0;
}
.blue {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.blue:hover {
  box-shadow: 0 0 40px 40px #000000 inset;
}
.selector-exchange {
  display: block;
  font-size: 12px;
  font-family: "Arial", sans-serif;
  font-weight: 400;
  color: #000000;
  line-height: 1.3;
  padding: -1em -1em -1em -1em;
  width: 95px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  margin-top: -8px;
  margin-left: -10px;
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
.selector-exchange::-ms-expand {
  display: none;
}
.selector-exchange:hover {
  border-color: #888;
}
.selector-exchange:focus {
  border-color: #000000;
  box-shadow: 0 0 1px 3px rgba(40, 64, 168, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #000000;
  outline: none;
}
.selector-exchange option {
  font-weight: normal;
}
</style>