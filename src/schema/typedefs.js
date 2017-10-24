
const typeDefs = `
  type App {
      id: ID!
      appid: String!
      name: String!
  }

  type Query {
      allApps(filter: AppFilter, first: Int, skip: Int): [App]
  }

  input AppFilter {
      steam_app_id: String
      name_contains: String
  }
`;

module.exports = typeDefs;