<template>
    <div>
      <h1 id="titulo-inversion">Estado de Inversion</h1>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100 ver6 m-b-110">
              <table data-vertable="ver6">
                <thead>
                  <tr class="row100 head">
                    <th class="column100 column1" data-column="column1">Criptomoneda</th>
                    <th class="column100 column2" data-column="column2">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row100">
                    <td class="column100 column1" data-column="column1">Bitcoin</td>
                    <td class="column100 column2" data-column="column2">
                      $ {{ this.inversionBtc.toFixed(2) }}
                    </td>
                  </tr>
  
                  <tr class="row100">
                    <td class="column100 column1" data-column="column1">Cardano</td>
                    <td class="column100 column2" data-column="column2">
                      $ {{ this.inversionAda.toFixed(2) }}
                    </td>
                  </tr>
                  <tr class="row100">
                    <td class="column100 column1" data-column="column1">Ethereum</td>
                    <td class="column100 column2" data-column="column2">
                      $ {{ this.inversionEth.toFixed(2) }}
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
  export default {
    name: "AnalisisDeInversion",
    props: {
      precioBtc: {
        require: true,
      },
      precioAda: {
        require: true,
      },
      precioEth: {
        require: true,
      },
      bitcoin: {
        require: true,
      },
      cardano: {
        require: true,
      },
      ethereum: {
        require: true,
      },
    },
    data() {
      return {
        movimientos: [],
        precios: [],
        inversionBtc: 0,
        inversionAda: 0,
        inversionEth: 0,
      };
    },
    computed: {},
    methods: {
      CalcularInversion() {
        this.movimientos.forEach((movimiento) => {
          if (movimiento.crypto_code === "bitcoin") {
            if (movimiento.action === "purchases") {
              this.inversionBtc -= parseFloat(movimiento.money);
            } else {
              this.inversionBtc += parseFloat(movimiento.money);
            }
          } else if (movimiento.crypto_code === "cardano") {
            if (movimiento.action === "purchases") {
              this.inversionAda -= parseFloat(movimiento.money);
            } else {
              this.inversionAda += parseFloat(movimiento.money);
            }
          } else {
            if (movimiento.action === "purchases") {
              this.inversionEth -= parseFloat(movimiento.money);
            } else {
              this.inversionEth += parseFloat(movimiento.money);
            }
          }
        });
        if (this.bitcoin > 0) {
          this.inversionBtc += parseFloat(this.precioBtc);
        }
        if (this.cardano > 0) {
          this.inversionAda += parseFloat(this.precioAda);
        }
        if (this.ethereum > 0) {
          this.inversionEth += parseFloat(this.precioEth);
        }
      },
    },
    mounted() {
      Servicios.getTransaccion(this.$store.state.usuario)
        .then((respuesta) => {
          this.movimientos = respuesta.data;
          console.log(this.movimientos);
          this.CalcularInversion();
        })
        .catch(() => {
          console.log("Error");
        });
    },
  };
  </script>
  <style>
  #titulo-inversion{
    color:#ff9844
  }
  .limiter {
    width: 98%;
  
    margin: 0 auto;
    margin-left: -35px;
  }
  
  .container-table100 {
    width: 100%;
    min-height: 20vh;
    background: rgb(255, 255, 255);
  
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
  
  .wrap-table100 {
    width: 1300px;
  }
  
  /*//////////////////////////////////////////////////////////////////
  [ Table ]*/
  table {
    width: 100%;
    background-color: #ffffff;
  }
  
  th,
  td {
    font-weight: unset;
    padding-right: 10px;
  }
  
  .column100 {
    width: 130px;
    padding-left: 25px;
  }
  
  .column100.column1 {
    width: 110px;
    padding-left: 42px;
  }
  
  .row100.head th {
    padding-top: 24px;
    padding-bottom: 20px;
  }
  
  .row100 td {
    padding-top: 18px;
    padding-bottom: 14px;
  }
  .table100.ver6 {
    border-radius: 16px;
    overflow: hidden;
    background: #1a01ff;
    background: -webkit-linear-gradient(-68deg, #fcff38, #ff9844);
    background: -o-linear-gradient(-68deg, #fcff38, #ff9844);
    background: -moz-linear-gradient(-68deg, #fcff38, #ff9844);
    background: linear-gradient(-68deg, #fcff38, #ff9844);
  }
  
  .table100.ver6 table {
    background-color: transparent;
  }
  
  .table100.ver6 td {
    font-family: Montserrat-Regular;
    font-size: 14px;
    color: #050101;
    line-height: 1.4;
  }
  
  .table100.ver6 th {
    font-family: Montserrat-Medium;
    font-size: 12px;
    color: #000000;
    line-height: 1.4;
    text-transform: uppercase;
  
    background-color: rgba(255, 255, 255, 0.32);
  }
  
  .table100.ver6 .row100:hover td {
    background-color: rgba(63, 236, 248, 0.2);
  }
  
  .table100.ver6 .hov-column-ver6 {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .table100.ver6 .row100 td:hover {
    background-color: rgba(63, 236, 248, 0.2);
  }
  </style>