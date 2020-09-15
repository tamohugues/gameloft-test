import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field((type) => ID)
  readonly name: string;

  @Field()
  readonly picture: string;
}
