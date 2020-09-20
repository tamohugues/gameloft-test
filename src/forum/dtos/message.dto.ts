import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from './user.dto';

@ObjectType()
export class Message {
  @Field((type) => ID)
  id: number;

  @Field()
  text: string;

  @Field((type) => Date)
  date: Date;

  @Field((type) => User)
  sender: User;
}
