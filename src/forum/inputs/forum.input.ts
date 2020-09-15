import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsNotEmpty, IsDefined, IsArray } from 'class-validator';

@InputType()
export class ForumInput {
  @Field((type) => Int)
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field((type) => [Int])
  @IsArray()
  @IsDefined()
  members: Array<number>;
}
