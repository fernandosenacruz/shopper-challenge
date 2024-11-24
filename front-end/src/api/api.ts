import axios from 'axios';
import { IBodyRideEstimate, IRideEstimate } from '../interfaces/rideEstimate';

interface IRideEstimateResponse {
  message: string;
  response: IRideEstimate;
}

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEstimate = async (payload: IBodyRideEstimate) => {
  try {
    const response = await api.post('/ride/estimate', payload);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const patchConfirm = async (payload: any) => {
  try {
    const response = await api.patch('/ride/confirm', payload);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getRides = async (customer_id: string, driver_id?: string) => {
  try {
    let url = `/ride/?${customer_id}`;
    if (driver_id) url += `&${driver_id}`;

    const response = await api.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getCustomer = async (customer_id: string) => {
  try {
    const response = { id: '12inas@33', name: 'Ximira' };
    return Promise.resolve(response);
  } catch (error) {
    console.error(error);
  }
};
