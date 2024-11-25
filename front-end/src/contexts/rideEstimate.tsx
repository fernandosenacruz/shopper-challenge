import React, { Dispatch, SetStateAction, createContext } from 'react';
import { IRideEstimate } from '../interfaces/rideEstimate';

type props = { children: React.ReactNode };

type ContextType = {
  customer: { id: string; name: string };
  setCustomer: Dispatch<SetStateAction<{ id: string; name: string }>>;
  rideEstimate: IRideEstimate;
  setRideEstimate: (value: IRideEstimate) => void;
};

export const DEFAULT_VALUE = {
  customer: { id: '12inas@33', name: 'Ximira' },
  setCustomer: () => {},
  rideEstimate: {
    origin: { latitude: 0, longitude: 0 },
    destination: { latitude: 0, longitude: 0 },
    distance: 0,
    duration: '',
    options: [],
  },
  setRideEstimate: () => {},
};

export const RideEstimateContext = createContext<ContextType>({
  customer: DEFAULT_VALUE.customer,
  setCustomer: DEFAULT_VALUE.setCustomer,
  rideEstimate: DEFAULT_VALUE.rideEstimate,
  setRideEstimate: DEFAULT_VALUE.setRideEstimate,
});

const RideEstimateProvider = ({ children }: props) => {
  const [customer, setCustomer] = React.useState(DEFAULT_VALUE.customer);
  const [rideEstimate, setRideEstimate] = React.useState<IRideEstimate>(
    DEFAULT_VALUE.rideEstimate
  );

  const value = React.useMemo(() => {
    return {
      customer,
      setCustomer,
      rideEstimate,
      setRideEstimate,
    };
  }, [customer, setCustomer, rideEstimate, setRideEstimate]);

  return (
    <RideEstimateContext.Provider value={value}>
      {children}
    </RideEstimateContext.Provider>
  );
};

export default RideEstimateProvider;
