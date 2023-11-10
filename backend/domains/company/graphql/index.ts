export default `
type CompaniesResponseType {
  data: [CompanyType]
  meta: MetaType
}

type UsersResponseType {
  data: [UserType]
  meta: MetaType
}

type RoomsResponseType {
  data: [RoomType]
  meta: MetaType
}

type RoomType {
  id: Int
  name: String
}

type UserType {
  id: Int
  username: String
  companies: [CompanyType]
}

type CompanyType {
  id: Int
  name: String
  rooms: [RoomType]
}

type PaginationType {
  totalOfPage: Int
  page: Int
  totalOfRecord: Int
  pageSize: Int
}

type MetaType {
  pagination: PaginationType
}

input RoomFilterInput {    
  name: String
}

input CompanyFilterInput {    
  name: String
}

type Query {
  Companies(filter: CompanyFilterInput, page: Int, pageSize: Int): CompaniesResponseType
  Rooms(filter: RoomFilterInput, page: Int, pageSize: Int): RoomsResponseType
  Users(page: Int, pageSize: Int): UsersResponseType
}

type Mutation {
  createUser(username: String!): UserType
}

`;
