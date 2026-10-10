
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();

let tasks = [
  { id: '1', title: 'Study Java', status: 'Pending' }
];

const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    status: String!
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(id: ID!, title: String!): Task
    updateTask(id: ID!, title: String!, status: String!): Task
    deleteTask(id: ID!): String
  }
`);

const root = {
  getTasks: () => tasks,

  addTask: ({ id, title }) => {
    const task = {
      id: id,
      title: title,
      status: 'Pending'
    };

    tasks.push(task);
    return task;
  },

  updateTask: ({ id, title, status }) => {
    const task = tasks.find(t => t.id === id);

    if (task) {
      task.title = title;
      task.status = status;
    }

    return task;
  },

  deleteTask: ({ id }) => {
    const oldLength = tasks.length;

    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length < oldLength)
      return 'Task deleted successfully';

    return 'Task not found';
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('GraphQL server running on port 3000');
});
