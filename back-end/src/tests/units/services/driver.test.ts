import driverService from '../../../app/services/driver';
import driver from '../../../app/infrastructure/database/models/driver';

jest.mock('../../../app/infrastructure/database/models/driver', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
}));

describe('driverService', () => {
  describe('getDriverById', () => {
    it('should return driver details when driver is found', async () => {
      const mockDriver = {
        id: 1,
        name: 'John Doe',
        value: 100,
        min_distance: 10,
      };
      (driver.findOne as jest.Mock).mockResolvedValue(mockDriver);

      const result = await driverService.getDriverById({ id: 1 });

      expect(result).toEqual({
        id: mockDriver.id,
        name: mockDriver.name,
        value: mockDriver.value,
        min_distance: mockDriver.min_distance,
      });
    });

    it('should return undefined when driver is not found', async () => {
      (driver.findOne as jest.Mock).mockResolvedValue(null);

      const result = await driverService.getDriverById({ id: 1 });

      expect(result).toBeUndefined();
    });

    it('should throw an error when driver.findOne fails', async () => {
      (driver.findOne as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await expect(driverService.getDriverById({ id: 1 })).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('getDrivers', () => {
    it('should return list of drivers', async () => {
      const mockDrivers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];
      (driver.find as jest.Mock).mockResolvedValue(mockDrivers);

      const result = await driverService.getDrivers();

      expect(result).toEqual(mockDrivers);
    });

    it('should return empty list when no drivers are found', async () => {
      (driver.find as jest.Mock).mockResolvedValue([]);

      const result = await driverService.getDrivers();

      expect(result).toEqual([]);
    });

    it('should throw an error when driver.find fails', async () => {
      (driver.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(driverService.getDrivers()).rejects.toThrow(
        'Database error'
      );
    });
  });
});
