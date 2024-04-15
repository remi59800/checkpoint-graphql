import { Field, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Continent } from './Continent';
import { ObjectCode } from './ObjectCode';

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryColumn()
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  emoji!: string;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @Field(() => Continent, { nullable: true })
  continent!: Continent;
}

@InputType()
export class CountryCreateInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  emoji!: string;

  @Field()
  continent!: ObjectCode;
}
