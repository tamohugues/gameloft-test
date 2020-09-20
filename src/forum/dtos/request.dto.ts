import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsBoolean, IsNotEmpty, IsArray } from 'class-validator';
import { GraphQLBoolean } from 'graphql';

@ObjectType()
export class Request {
  @Field((type) => ID)
  @IsNumber()
  @IsOptional()
  id: number;

  @Field((type) => Int)
  @IsNumber()
  senderId: number;

  @Field((type) => Int)
  @IsNumber()
  forumId: number;
}
