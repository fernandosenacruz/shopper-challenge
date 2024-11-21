import { Request, Response } from 'express';
import rideEstimate from '../services/rideEstimate';
import rideService from '../services/ride';
import geocodingService from '../services/geocode';

// todo: tipar o retorno da função
const rideController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { customer_id, origin, destination } = req.body;
    console.log('entrou no rideController');
    console.log('customer_id:', customer_id);
    console.log('origin:', origin);
    console.log('destination:', destination);

    const geocodeOrigin = await geocodingService(origin.address);
    if (geocodeOrigin.error)
      return res.status(400).json({ error: geocodeOrigin.error });

    const geocodeDestination = await geocodingService(destination.address);
    if (geocodeDestination.error)
      return res.status(400).json({ error: geocodeDestination.error });

    const { distanceMeters, durationSeconds } = await rideEstimate(
      geocodeOrigin,
      geocodeDestination
    );

    const options = await rideService(distanceMeters);

    const response = {
      customer_id,
      origin: geocodeOrigin,
      destination: geocodeDestination,
      distanceMeters,
      durationSeconds,
      options,
    };

    res
      .status(200)
      .json({ message: 'Operação realizada com sucesso', response });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

export default rideController;
