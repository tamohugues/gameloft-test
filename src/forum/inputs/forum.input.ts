import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsBoolean, IsNotEmpty, IsArray } from 'class-validator';
import { GraphQLBoolean } from 'graphql';

export class ForumInput {
  id?: number;
  name: string;
  members: Array<number>;
  isPrivate: boolean;
}

@InputType()
export class CreateForumInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field((type) => Int)
  @IsNumber()
  userId: number;

  @Field((type) => GraphQLBoolean, { nullable: true })
  @IsBoolean()
  isPrivate?: boolean;
}
