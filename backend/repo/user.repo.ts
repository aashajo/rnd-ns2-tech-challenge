import { BaseRepo } from "./base.repo";
import { IUser, users } from "./data";

export class UserRepo extends BaseRepo<IUser> {
  constructor() {
    super(users);
  }

  selectByIds(ids: readonly number[]): IUser[] {
    return this._data.filter((user) => ids.includes(user.id));
  }

  async create(username: string): Promise<IUser> {
    const user: IUser = {
      id: this._data.length + 1,
      username: username,
      companyIds: [],
    };
    this._data.push(user);
    return user;
  }
}
