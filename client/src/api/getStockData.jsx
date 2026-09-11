import axios from 'axios';

export default async function getStockData(symbol) {
    const api = axios.create({
        baseURL: "http://localhost:3001/api",
      });
    const response = await api.get(`stocks/${symbol}`)
    return response.data;
}