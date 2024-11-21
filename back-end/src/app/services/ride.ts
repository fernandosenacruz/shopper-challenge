import { fakeDrivers } from '../infrastructure/database/fakeDrivers';

const rideService = async (distanceMeters: number) => {
  try {
    return fakeDrivers.filter(
      (driver) => driver.min_distance <= distanceMeters
    );
  } catch (error: any) {
    throw error;
  }
};

export default rideService;
