import { CreateAnimalInput } from './create-animal.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  scientistName: string;

  @Field(() => String)
  photo: string;
}
