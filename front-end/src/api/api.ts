import axios from 'axios';
import { IBodyRideEstimate, IRideEstimate } from '../interfaces/rideEstimate';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEstimate = async (payload: IBodyRideEstimate) => {
  try {
    const response = await api.post('/ride/estimate', payload);
    return {
      origin: response.data.response.origin,
      destination: response.data.response.destination,
      distance: response.data.response.distance,
      duration: response.data.response.duration,
      options: response.data.response.options,
    };
  } catch (error: any) {
    console.error('Erro ao buscar estimativa:', error);
    if (error && error.status === 404) return error.response.data;
  }
};

export const patchConfirm = async (payload: any) => {
  try {
    const response = await api.patch('/ride/confirm', payload);
    console.log(response.data);
  } catch (error: any) {
    if (error && error.status === 404) return error.response.data;
  }
};

export const getRides = async (customer_id: string, driver_id?: string) => {
  try {
    let url = `/ride/?${customer_id}`;
    if (driver_id) url += `&${driver_id}`;

    const response = await api.get(url);
    console.log(response.data);
  } catch (error: any) {
    if (error && error.status === 404) return error.response.data;
  }
};

export const getCustomer = async (customer_id: string) => {
  try {
    const { data } = await api.get(`/customer?id=${customer_id}`);
    return data.response;
  } catch (error: any) {
    if (error && error.status === 404) return error.response.data;
  }
};
