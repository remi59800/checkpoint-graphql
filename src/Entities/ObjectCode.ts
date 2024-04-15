import { Field, InputType } from 'type-graphql';

@InputType()
export class ObjectCode {
  @Field()
  code!: string;
}
