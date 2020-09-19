import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  picture: string;
}
