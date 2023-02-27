import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnimalInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  scientistName: string;

  @Field(() => String)
  photo: string;
}
