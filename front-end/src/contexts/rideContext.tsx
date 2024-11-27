import React, { Dispatch, SetStateAction, createContext } from 'react';
import { IRideEstimate } from '../interfaces/ride';
import { IDriver } from '../interfaces/driver';

type props = { children: React.ReactNode };

type ContextType = {
  customer: { id: string; name: string };
  setCustomer: Dispatch<SetStateAction<{ id: string; name: string }>>;
  rideEstimate: IRideEstimate;
  setRideEstimate: (value: IRideEstimate) => void;
  driver: IDriver;
  setDriver: (value: IDriver) => void;
};

export const DEFAULT_VALUE = {
  customer: { id: '12inas@33', name: 'Ximira' },
  setCustomer: () => {},
  rideEstimate: {
    origin: { latitude: 0, longitude: 0 },
    strOrigin: '',
    destination: { latitude: 0, longitude: 0 },
    strDestination: '',
    distance: 0,
    duration: '',
    options: [],
  },
  setRideEstimate: () => {},
  driver: {
    id: 0,
    name: '',
    description: '',
    review: { rating: 0, comment: '' },
    value: 0,
    vehicle: '',
  },
  setDriver: () => {},
};

export const RideContext = createContext<ContextType>({
  customer: DEFAULT_VALUE.customer,
  setCustomer: DEFAULT_VALUE.setCustomer,
  rideEstimate: DEFAULT_VALUE.rideEstimate,
  setRideEstimate: DEFAULT_VALUE.setRideEstimate,
  driver: DEFAULT_VALUE.driver,
  setDriver: DEFAULT_VALUE.setDriver,
});

const RideProvider = ({ children }: props) => {
  const [customer, setCustomer] = React.useState(DEFAULT_VALUE.customer);
  const [rideEstimate, setRideEstimate] = React.useState<IRideEstimate>(
    DEFAULT_VALUE.rideEstimate
  );
  const [driver, setDriver] = React.useState<IDriver>(DEFAULT_VALUE.driver);

  const value = React.useMemo(() => {
    return {
      customer,
      setCustomer,
      rideEstimate,
      setRideEstimate,
      driver,
      setDriver,
    };
  }, [customer, setCustomer, rideEstimate, setRideEstimate, driver, setDriver]);

  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
};

export default RideProvider;
