import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';
import { IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class CloseRequestInput {
  @Field((type) => Int)
  @IsNumber()
  requestId: number;

  @Field((type) => GraphQLBoolean)
  @IsBoolean()
  isAccepted: boolean;
}

@InputType()
export class CreateRequestInput {
  @Field((type) => Int)
  @IsNumber()
  senderId: number;

  @Field((type) => Int)
  @IsNumber()
  forumId: number;
}

export class RequestInput {
  senderId: number;
  forumId: number;
  adminId: number;
  isAccepted: boolean;
  isClosed: boolean;
}
