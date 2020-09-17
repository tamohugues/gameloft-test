import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field((type) => ID)
  name: string;

  @Field()
  picture: string;
}
