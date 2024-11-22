import user, { IUser } from '../infrastructure/database/models/user';

const userService = {
  async getUserById({
    id,
  }: {
    id: string;
  }): Promise<Partial<IUser> | undefined> {
    try {
      const registredUser = await user.findOne({ id });

      if (!registredUser || !registredUser.id) return;

      return { id: registredUser.id };
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default userService;
