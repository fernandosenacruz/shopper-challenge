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
    const result: { data: { response: IRideEstimate } } = await api.post(
      '/ride/estimate',
      payload
    );
    return {
      origin: result.data.response.origin,
      destination: result.data.response.destination,
      distance: result.data.response.distance,
      duration: result.data.response.duration,
      options: result.data.response.options,
    };
  } catch (error: any) {
    console.error('Erro ao buscar estimativa:', error);
    if (error && error.status === 404) return error.response.data;
  }
};

export const patchConfirm = async (payload: any /* todo interface*/) => {
  try {
    const response = await api.patch('/ride/confirm', payload);
    console.log(response.data);
  } catch (error: any) {
    if (
      error &&
      (error.status === 404 || error.status === 400 || error.status === 406)
    ) {
      console.error('Erro ao confirmar corrida:', error);
      return error.response.data;
    }
  }
};

export const getRides = async (customer_id: string, driver_id?: string) => {
  try {
    let url = `/ride?customer_id=${customer_id}`;
    if (driver_id) url += `&driver_id=${driver_id}`;
    const result = await api.get(url);
    return result.data.response;
  } catch (error: any) {
    if (error && (error.status === 404 || error.status === 400)) {
      console.error('Erro ao buscar corridas:', error);
      return error.response.data;
    }
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
