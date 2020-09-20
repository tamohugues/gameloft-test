import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsBoolean, IsNotEmpty, IsArray } from 'class-validator';
import { GraphQLBoolean } from 'graphql';

@InputType()
export class ForumInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field((type) => [Int])
  @IsArray()
  members: Array<number>;

  @Field((type) => GraphQLBoolean)
  @IsBoolean()
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
