import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserDto } from './user.dto';

@ObjectType()
export class MessageDto {
  @Field((type) => ID)
  readonly id: number;

  @Field()
  readonly text: string;

  @Field((type) => Date)
  readonly date: Date;

  @Field((type) => UserDto)
  readonly sender: UserDto;
}
