import { CreateRoleInput } from './create-role.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @Field()
  role: string;
}
