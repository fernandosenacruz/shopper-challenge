import userService from '../../../app/services/user';
import user from '../../../app/infrastructure/database/models/user';
import MESSAGES from '../../../app/helpers/messages';

jest.mock('../../../app/infrastructure/database/models/user', () => ({
  findOne: jest.fn(),
}));

describe('userService', () => {
  describe('getUserById', () => {
    it('should return user details when user is found', async () => {
      const mockUser = { id: '1', name: 'John Doe' };
      (user.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById({ id: '1' });

      expect(result).toEqual({ id: mockUser.id, name: mockUser.name });
    });

    it('should return USER_NOT_FOUND message when user is not found', async () => {
      (user.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserById({ id: '1' });

      expect(result).toBe(MESSAGES.USER_NOT_FOUND);
    });

    it('should return USER_NOT_FOUND message when user is found but id is missing', async () => {
      const mockUser = { name: 'John Doe' }; // Missing `id` field
      (user.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById({ id: '1' });

      expect(result).toBe(MESSAGES.USER_NOT_FOUND);
    });

    it('should throw an error when user.findOne fails', async () => {
      (user.findOne as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await expect(userService.getUserById({ id: '1' })).rejects.toThrow(
        'Database error'
      );
    });
  });
});
