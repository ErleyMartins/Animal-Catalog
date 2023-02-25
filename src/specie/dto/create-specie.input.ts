import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSpecieInput {
  @IsAlpha()
  @IsNotEmpty()
  @Field(() => String)
  name: string;
}
