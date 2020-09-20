import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Message } from './message.dto';
import { User } from './user.dto';

@ObjectType()
export class Forum {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field((type) => [User])
  members: Array<User>;

  @Field((type) => [Message], { nullable: true })
  messages?: Array<Message>;
}
