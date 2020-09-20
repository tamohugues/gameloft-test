import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class MessageInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field((type) => Int, { nullable: true })
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
