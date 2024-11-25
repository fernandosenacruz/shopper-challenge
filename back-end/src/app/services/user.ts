import MESSAGES from '../helpers/messages';
import user, { IUser } from '../infrastructure/database/models/user';

const userService = {
  async getUserById({ id }: { id: string }): Promise<Partial<IUser> | string> {
    try {
      const registredUser = await user.findOne({ id });

      if (!registredUser || !registredUser.id) return MESSAGES.USER_NOT_FOUND;

      return { id: registredUser.id, name: registredUser.name };
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default userService;
