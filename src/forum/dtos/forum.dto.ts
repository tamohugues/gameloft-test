import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MessageDto } from './message.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class ForumDto {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field((type) => [UserDto])
  members: Array<UserDto>;

  @Field((type) => [MessageDto], { nullable: true })
  messages?: Array<MessageDto>;
}
