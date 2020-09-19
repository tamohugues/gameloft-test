import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserDto } from './user.dto';

@ObjectType()
export class MessageDto {
  @Field((type) => ID)
  id: number;

  @Field()
  text: string;

  @Field((type) => Date)
  date: Date;

  @Field((type) => UserDto)
  sender: UserDto;
}
