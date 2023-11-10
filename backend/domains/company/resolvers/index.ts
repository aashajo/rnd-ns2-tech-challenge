import { CompanyService } from "../service";
import DataLoader from "dataloader";

const companyService = new CompanyService();

const userLoader = new DataLoader(async (ids: readonly number[]) => {
  return await companyService.getUsersByIds(ids);
});

export default {
  Query: {
    async Users(parent: any, args: any, context: any, info: any): Promise<any> {
      const { page, pageSize } = args;
      const { data, totalOfRecord, totalOfPage } =
        await companyService.getUsersWithPagination(page, pageSize);
      return {
        data,
        meta: { pagination: { totalOfRecord, page, pageSize, totalOfPage } },
      };
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username }: { username: string },
      context: any,
      info: any
    ) => {
      const newUser = await companyService.createUser(username);
      return newUser;
    },
  },
  UserType: {
    companies: async (parent: any, args: any, context: any, info: any) => {
      const companyIds = parent.companies.map((company: any) => company.id);
      return userLoader.loadMany(companyIds);
    },
  },
};
