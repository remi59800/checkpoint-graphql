import { DataSource } from 'typeorm';
import { Country } from './Entities/Country';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './checkpoint-gql.sqlite',
  entities: [Country],
  synchronize: true,
  logging: true,
});
