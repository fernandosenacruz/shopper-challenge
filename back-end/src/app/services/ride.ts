import { Driver, fakeDrivers } from '../infrastructure/database/fakeDrivers';

const rideService = async (
  distanceMeters: number
): Promise<Partial<Driver>[]> => {
  try {
    return fakeDrivers
      .filter((driver: Driver) => driver.min_distance <= distanceMeters)
      .map((driver: Driver) => {
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: driver.review,
          value: (driver.value * distanceMeters) / 1000,
        };
      });
  } catch (error: any) {
    throw error;
  }
};

export default rideService;
