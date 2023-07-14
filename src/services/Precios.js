import axios from 'axios';

const cliente = axios.create({
	baseURL: "https://criptoya.com",
	
});


export default {
  getPrecios(cripto,volumen,exchange){
    return cliente.get(`/api/${exchange}/${cripto}/ars/${volumen}`);
  } 
};
