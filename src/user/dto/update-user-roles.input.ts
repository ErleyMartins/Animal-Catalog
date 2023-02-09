import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdateRoleInput } from 'src/role/dto/update-role.input';

@InputType()
export class UpdateUserRolesInput extends PartialType(CreateUserInput) {
  @Field(() => [UpdateRoleInput])
  roles: UpdateRoleInput[];

  @Field(() => String)
  id: string;
}
