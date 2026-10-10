
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();
let tasks = [];

const schema = buildSchema(`
  type Task {
    id: ID
    title: String
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(id: ID!, title: String!): Task
  }
`);

const root = {
  getTasks: () => tasks,

  addTask: ({ id, title }) => {
    const task = { id, title };
    tasks.push(task);
    return task;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('GraphQL API running on port 3000');
});
