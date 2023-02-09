import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Role> {
    return this.roleService.findOne({ id });
  }

  @Mutation(() => Role)
  updateRole(
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.update(updateRoleInput);
  }

  @Mutation(() => Boolean)
  removeRole(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.roleService.remove(id);
  }
}
