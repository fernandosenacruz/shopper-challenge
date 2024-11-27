import driver, { IDriver } from '../infrastructure/database/models/driver';

const driverService = {
  async getDriverById({
    id,
  }: {
    id: number;
  }): Promise<Partial<IDriver> | undefined> {
    try {
      const registredDriver = await driver.findOne({ id });

      if (!registredDriver) return;

      return {
        id: registredDriver.id,
        name: registredDriver.name,
        value: registredDriver.value,
        min_distance: registredDriver.min_distance,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async getDrivers(): Promise<Partial<IDriver>[]> {
    try {
      const registredDrivers = await driver.find();

      return registredDrivers.map((registredDriver) => ({
        id: registredDriver.id,
        name: registredDriver.name,
      }));
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default driverService;
