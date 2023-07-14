<template>
  <div>
    <h2>Historial de tus transacciones</h2>
    <div class="limiter">
      <div class="container-table100">
        <div class="wrap-table100">
          <div class="table100 ver2 m-b-110">
            <table data-vertable="ver2">
              <thead>
                <tr class="row100 head">
                  <th class="column100 column1" data-column="column1"></th>
                  <th class="column100 column2" data-column="column2">Accion</th>
                  <th class="column100 column3" data-column="column3">Criptomoneda</th>
                  <th class="column100 column4" data-column="column4">Cantidad</th>
                  <th class="column100 column5" data-column="column5">Costo</th>
                  <th class="column100 column6" data-column="column6">Fecha</th>
                  <th class="column100 column7" data-column="column7"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="row100" v-for="movimiento in movimientos" :key="movimiento">
                  <td class="column100 column1" data-column="column1">
                    {{ movimiento.user_id }}
                  </td>
                  <td class="column100 column2" data-column="column2">
                    {{ movimiento.action }}
                  </td>
                  <td class="column100 column3" data-column="column3">
                    {{ movimiento.crypto_code }}
                  </td>
                  <td class="column100 column4" data-column="column4">
                    {{ movimiento.crypto_amount }}
                  </td>
                  <td class="column100 column5" data-column="column5">
                    ${{ movimiento.money }}
                  </td>
                  <td class="column100 column6" data-column="column6">
                    {{ movimiento.datetime }}
                  </td>
                  <router-link
                    :to="{ name: 'DetalleTransaccion', params: { id: movimiento._id } }"
                  >
                    <td class="column100 column7" data-column="column7">VER</td>
                  </router-link>
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
  name: "HistorialDeMovimientos",
  data() {
    return {
      movimientos: [],
    };
  },

  mounted() {
    Servicios.getTransaccion(this.$store.state.usuario)
      .then((respuesta) => {
        this.movimientos = respuesta.data;
      })
      .catch(() => {
        console.log("Error");
      });
  },
};
</script>
<style scoped>
h2 {
  background: #000000;
  text-shadow: 2px 2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff,
    -2px -2px 0 #ffffff, 2px 0px 0 #ffffff, 0px 2px 0 #ffffff, -2px 0px 0 #ffffff,
    0px -2px 0 #ffffff;
  color: #000000;
  background: transparent;
  font-size: 45px;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-table100 {
  width: 98%;
  min-height: 5vh;
  background: transparent;
  margin-left: -17px;
  margin-top: -30px;
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

table {
  width: 100%;
  background-color: #fff;
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
  width: 85px;
  padding-left: 42px;
}
.column6 {
  width: 200px;
}
.row100.head th {
  padding-top: 24px;
  padding-bottom: 20px;
}

.row100 td {
  padding-top: 18px;
  padding-bottom: 14px;
}
.table100.ver2 td {
  font-family: Montserrat-Regular;
  font-size: 14px;
  color: #18bdff;
  line-height: 1.4;
}

.table100.ver2 th {
  font-family: Montserrat-Medium;
  font-size: 12px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #1d10d4;
}

.table100.ver2 .row100:hover td {
  background-color: #000000;
  color: #ffffff;
}

.table100.ver2 .hov-column-ver2 {
  background-color: #000000;
  color: #ffffff;
}

.table100.ver2 .hov-column-head-ver2 {
  background-color: #1815c2 !important;
}

.table100.ver2 .row100 td:hover {
  background-color: #000000;
  color: #ffffff;
}

/*==================================================================
[ Ver2 ]*/
.table100.ver2 tbody tr:nth-child(even) {
  background-color: #8a8a8a;
}

.table100.ver2 td {
  font-family: Montserrat-Regular;
  font-size: 14px;
  color: #000000;
  line-height: 1.4;
}

.table100.ver2 th {
  font-family: Montserrat-Medium;
  font-size: 12px;
  color: #ffffff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #1a23a1;
}

.table100.ver2 .row100:hover td {
  background-color: #000000;
  color: #fefeff;
}

.table100.ver2 .hov-column-ver2 {
  background-color: #000000;
  color: #ffffff;
}

.table100.ver2 .hov-column-head-ver2 {
  background-color: #1f2ac2 !important;
}

.table100.ver2 .row100 td:hover {
  background-color: #000000;
  color: #ffffff;
}
</style>
