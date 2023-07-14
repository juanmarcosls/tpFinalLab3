import axios from 'axios';

const clienteAPI = axios.create({
	baseURL: "https://labor3-d60e.restdb.io/rest/",
	headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
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
