import { CreateSpecieInput } from './create-specie.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateSpecieInput extends PartialType(CreateSpecieInput) {
  @Field(() => Int)
  id: number;

  @IsAlphanumeric()
  @IsNotEmpty()
  @Field(() => String)
  name: string;
}
