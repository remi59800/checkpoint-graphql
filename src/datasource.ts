import { DataSource } from 'typeorm';
import { Country } from './Entities/Country';
import { Continent } from './Entities/Continent';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './checkpoint-gql.sqlite',
  entities: [Country, Continent],
  synchronize: true,
  logging: true,
});
