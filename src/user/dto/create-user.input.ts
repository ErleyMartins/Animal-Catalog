import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsEmail } from 'class-validator';
import { UpdateRoleInput } from 'src/role/dto/update-role.input';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @Field(() => [UpdateRoleInput])
  roles: UpdateRoleInput[];
}
