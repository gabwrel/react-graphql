import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'

const users = [
    { id: '1', name: 'Alice', age: 30, isMarried: true },
    { id: '2', name: 'Bob', age: 25, isMarried: false },
    { id: '3', name: 'Charlie', age: 35, isMarried: true }
]


const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        },
        getUserById: (parent, args) => {
            const user = users.find(user => user.id === args.id);
            return user;
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = {
                id: String(users.length + 1),
                name: args.name,
                age: args.age,
                isMarried: args.isMarried
            };
            users.push(newUser);
            return newUser;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {} = await startStandaloneServer(server, {
  listen: {port: 4000},
})

console.log(`🚀 Server ready at: http://localhost:4000/`)