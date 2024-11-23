import ride, { IRide } from './../infrastructure/database/models/ride';
import driver, { IDriver } from '../infrastructure/database/models/driver';
import driverService from './driver';
import MESSAGES from '../helpers/messages';
import userService from './user';

const rideService = {
  async getRideEstimate({
    distanceMeters,
  }: {
    distanceMeters: number;
  }): Promise<Partial<IDriver>[]> {
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
      throw new Error(error);
    }
  },

  async postRideConfirm({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: IRide) {
    try {
      const user = await userService.getUserById({
        id: customer_id.toString(),
      });

      if (!user) return MESSAGES.USER_NOT_FOUND;

      const registredDriver = await driverService.getDriverById({
        id: driver.id,
      });

      if (!registredDriver) return MESSAGES.DRIVER_NOT_FOUND;
      if (distance < (registredDriver.min_distance ?? Infinity))
        return MESSAGES.INVALID_DISTANCE;

      let newRide = new ride({
        customer_id,
        date: new Date(),
        origin,
        destination,
        distance,
        duration,
        driver: {
          id: registredDriver.id,
          name: registredDriver.name,
        },
        value,
      });

      newRide.id = Number(
        (newRide._id as string).toString().replace(/\D/g, '')
      );

      const result = await ride.create(newRide);

      if (!result) return;

      return MESSAGES.RIDE_SUCCESS;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async getRidesByCustomerId({
    customer_id,
    driver_id,
  }: {
    customer_id: string;
    driver_id?: number;
  }) {
    try {
      const user = await userService.getUserById({
        id: customer_id.toString(),
      });

      if (!user) return MESSAGES.USER_NOT_FOUND;

      if (driver_id) {
        const driver = await driverService.getDriverById({
          id: driver_id,
        });

        if (!driver) return MESSAGES.DRIVER_NOT_FOUND;
      }

      const rides = await ride
        .find(
          {
            customer_id,
            ...(driver_id && { 'driver.id': driver_id }),
          },
          { _id: 0, __v: 0, customer_id: 0 }
        )
        .sort({ date: -1 });

      if (!rides || rides.length === 0) return MESSAGES.NOT_FOUND;

      return rides;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default rideService;
