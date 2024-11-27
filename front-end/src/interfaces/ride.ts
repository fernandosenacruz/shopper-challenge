import { IDriver } from './driver';

export interface IGeocode {
  latitude: number;
  longitude: number;
}

export interface IOption extends IDriver {
  routeResponse: {
    distanceMeters: number;
    durationSeconds: number;
  };
}

export interface IRideEstimate {
  origin: IGeocode;
  strOrigin?: string;
  destination: IGeocode;
  strDestination?: string;
  distance: number;
  duration: string;
  options: IOption[];
}

export interface IBodyRideEstimate {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface IBodyRideConfirm {
  customer_id: string;
  driver_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IDriver;
  value: number;
}

export interface IBodyRide {
  customer_id: string;
  driver_id: string;
}

export interface IRideDetailing {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Partial<IDriver>;
  value: number;
}
