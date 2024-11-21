import driver, { IDriver } from '../infrastructure/database/models/driver';

const rideService = async (
  distanceMeters: number
): Promise<Partial<IDriver>[]> => {
  try {
    const drivers = await driver.find({
      min_distance: { $lte: distanceMeters },
    });

    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.review.rating,
        comment: driver.review.comment,
      },
      value: (driver.value * distanceMeters) / 1000,
    }));
  } catch (error: any) {
    throw error;
  }
};

export default rideService;
