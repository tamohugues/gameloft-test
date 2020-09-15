import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UserInput {
  @Field((type) => Int)
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  picture: string;
}
