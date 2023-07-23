import axios from 'axios';

const clienteAPI = axios.create({
	baseURL: "https://laboratorio-36cf.restdb.io/rest/",
	headers: { "x-apikey": "64a5ccf686d8c5d256ed8fce" },
});


export default {
  getTransaccion(usuario) {
    return clienteAPI.get(`/transactions?q={"user_id": "${usuario}"}`);
    
  },
  getTransaccionId(id){
    return clienteAPI.get(`/transactions/${id}`);

  },
  postTransaccion(usuario,accion,tipo,cantidad,precio,fecha){
    return clienteAPI.post('/transactions', {	
    "user_id": usuario,
   "action": accion,
   "crypto_code": tipo,
   "crypto_amount": cantidad,
   "money": precio,
   "datetime": fecha

      }
    )
  },
  deleteTransaccion(id){
     return clienteAPI.delete(`/transactions/${id}`)
  },
  patchTransaccion(id,accion,tipo,cantidad,precio){
     return clienteAPI.patch(`/transactions/${id}`,{
   
      "action": accion,
      "crypto_code": tipo,
      "crypto_amount": cantidad,
      "money":precio
    
   
     })
     
  }
};
