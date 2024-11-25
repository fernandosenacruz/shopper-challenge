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
  destination: IGeocode;
  distance: number;
  duration: string;
  options: IOption[];
}

export interface IBodyRideEstimate {
  customer_id: string;
  origin: string;
  destination: string;
}
