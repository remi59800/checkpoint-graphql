import 'reflect-metadata';
import { dataSource } from './datasource';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { CountryResolver } from './Resolvers/Countries';

async function start() {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 5004,
    },
  });

  console.log('🚀 Server started!');
}

start();
