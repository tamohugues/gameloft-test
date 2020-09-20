import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsNotEmpty, IsArray } from 'class-validator';

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
}
