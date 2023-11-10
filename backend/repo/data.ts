export interface IUser {
  id: number;
  username: string;
  companyIds: number[];
}

export interface ICompany {
  id: number;
  name: string;
}

export interface IRoom {
  id: number;
  companyId: number;
  name: string;
}

const generateCompanies = (noOfCompanies: number): ICompany[] => {
  const companies: ICompany[] = [];

  for (let i = 1; i <= noOfCompanies; i++) {
    const company: ICompany = {
      id: i,
      name: `Company ${i}`,
    };
    companies.push(company);
  }

  return companies;
};

const generateRooms = (companies: ICompany[]): IRoom[] => {
  const rooms: IRoom[] = [];

  companies.forEach((company) => {
    const numRooms = Math.floor(Math.random() * 5) + 1; // Generate random number of rooms for each company

    for (let i = 1; i <= numRooms; i++) {
      const room: IRoom = {
        id: rooms.length + 1,
        companyId: company.id,
        name: `Room ${i} of ${company.name}`,
      };
      rooms.push(room);
    }
  });

  return rooms;
};

const generateUsers = (numUsers: number, companies: ICompany[]): IUser[] => {
  const users: IUser[] = [];

  for (let i = 1; i <= numUsers; i++) {
    const user: IUser = {
      id: i,
      username: `User${i}`,
      companyIds: generateRandomCompanyIds(companies),
    };
    users.push(user);
  }

  return users;
};

const generateRandomCompanyIds = (companies: ICompany[]): number[] => {
  const companyIds: number[] = [];
  const maxCompanyIds = Math.min(companies.length, 5); // Maximum 5 company IDs per user

  for (let i = 1; i <= maxCompanyIds; i++) {
    const randomIndex = Math.floor(Math.random() * companies.length);
    const companyId = companies[randomIndex].id;
    if (!companyIds.includes(companyId)) {
      companyIds.push(companyId);
    }
  }

  return companyIds;
};

// Usage example
export const companies: ICompany[] = generateCompanies(100);
export const rooms: IRoom[] = generateRooms(companies);
export const users: IUser[] = generateUsers(1000, companies);
