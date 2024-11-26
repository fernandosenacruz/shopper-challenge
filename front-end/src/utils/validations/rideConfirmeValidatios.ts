export const validateRideEstimate = (rideEstimate: {
  strOrigin?: string;
  strDestination?: string;
  distance: number;
  duration: string;
}): { message: string } | undefined => {
  if (!rideEstimate.strOrigin) return { message: 'Origem não informada' };

  if (!rideEstimate.strDestination) return { message: 'Destino não informado' };

  if (!rideEstimate.distance || !rideEstimate.duration) {
    return { message: 'Estimativa de viagem não informada' };
  }
};

export const customerValidate = (
  customer_id: string
): { message: string } | undefined => {
  if (!customer_id) {
    return { message: 'Cliente não informado' };
  }
};

export const driverValidate = (driver: {
  id: number;
  value: number;
}): { message: string } | undefined => {
  if (!driver?.id) return { message: 'Motorista não informado' };

  if (!driver?.value) return { message: 'Valor da corrida não informado' };
};
