import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MessageDto } from './message.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class ForumDto {
  @Field((type) => ID)
  readonly id: number;

  @Field()
  readonly name: string;

  @Field((type) => [UserDto])
  readonly members: Array<UserDto>;

  @Field((type) => [MessageDto], { nullable: true })
  readonly messages?: Array<MessageDto>;
}
