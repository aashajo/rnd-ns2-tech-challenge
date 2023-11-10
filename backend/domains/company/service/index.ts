import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {
  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  async getUsers(
    filter: { username?: string },
    page: number,
    pageSize: number
  ): Promise<any> {
    const offset = (page - 1) * pageSize;
    const data = await this._userRepo.select(filter);
    const paginatedData = data.slice(offset, offset + pageSize);
    const totalOfRecord = data.length;
    const totalOfPage = Math.ceil(totalOfRecord / pageSize);
    return {
      data: paginatedData,
      meta: { pagination: { totalOfPage, page, totalOfRecord, pageSize } },
    };
  }

  async getUsersByIds(ids: readonly number[]): Promise<any[]> {
    const users = await this._userRepo.selectByIds(ids);
    const usersMap = new Map(users.map((user: any) => [user.id, user]));
    const orderedUsers = ids.map((id) => usersMap.get(id) || null);

    return orderedUsers;
  }

  async getUsersWithPagination(page: number, pageSize: number): Promise<any> {
    const data = await this._userRepo.select();
    const offset = (page - 1) * pageSize;
    const paginatedData = data.slice(offset, offset + pageSize);
    const totalOfRecord = data.length;
    const totalOfPage = Math.ceil(totalOfRecord / pageSize);
    return { data: paginatedData, totalOfRecord, totalOfPage, pageSize };
  }

  async getUserCompanies(
    filter: { companyIds: number[] },
    page: number,
    pageSize: number
  ): Promise<any> {
    const offset = (page - 1) * pageSize;
    const data = await this._companyRepo.select(undefined, [
      { fieldName: "id", data: filter.companyIds },
    ]);
    const paginatedData = data.slice(offset, offset + pageSize);
    const totalOfRecord = data.length;
    const totalOfPage = Math.ceil(totalOfRecord / pageSize);
    return {
      data: paginatedData,
      meta: { pagination: { totalOfPage, page, totalOfRecord, pageSize } },
    };
  }

  async getCompanies(
    filter: { name?: string },
    page: number,
    pageSize: number
  ): Promise<any> {
    const offset = (page - 1) * pageSize;
    const data = await this._companyRepo.select(filter);
    const paginatedData = data.slice(offset, offset + pageSize);
    const totalOfRecord = data.length;
    const totalOfPage = Math.ceil(totalOfRecord / pageSize);
    return {
      data: paginatedData,
      meta: { pagination: { totalOfPage, page, totalOfRecord, pageSize } },
    };
  }

  async createUser(username: string): Promise<any> {
    const newUser = await this._userRepo.create(username);
    return newUser;
  }

  async getCompanyRooms(
    filter: { name?: string; companyId?: number },
    page: number,
    pageSize: number
  ): Promise<any> {
    const offset = (page - 1) * pageSize;
    const data = await this._roomRepo.select(filter);
    const paginatedData = data.slice(offset, offset + pageSize);
    const totalOfRecord = data.length;
    const totalOfPage = Math.ceil(totalOfRecord / pageSize);
    return {
      data: paginatedData,
      meta: { pagination: { totalOfPage, page, totalOfRecord, pageSize } },
    };
  }
}
