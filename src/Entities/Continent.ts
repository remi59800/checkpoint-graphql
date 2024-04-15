import { Field, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Country } from './Country';

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryColumn()
  @Field()
  code!: string;

  @OneToMany(() => Country, (country) => country.continent, { nullable: true })
  @Field(() => [Country], { nullable: true })
  countries!: Country[];
}

@InputType()
export class ContinentCreateInput {
  @Field()
  code!: string;
}