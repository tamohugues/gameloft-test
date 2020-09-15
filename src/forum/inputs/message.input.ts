import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class MessageInput {
  @Field((type) => Int)
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field((type) => Int)
  @IsOptional()
  @IsNumber()
  date?: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field((type) => Int)
  @IsNumber()
  @IsDefined()
  senderId: number;

  @Field((type) => Int)
  @IsNumber()
  @IsDefined()
  forumId: number;
}
