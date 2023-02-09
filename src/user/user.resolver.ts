import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Role } from 'src/auth/role.enum';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';

import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserRolesInput } from './dto/update-user-roles.input';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @Roles(Role.MANAGE_USERS)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @Roles(Role.MANAGE_USERS)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Roles(Role.MANAGE_USERS)
  findOne(@Args('id') id: string): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  @Roles(Role.MANAGE_USERS)
  updateUserRoles(
    @Args('updateUserRolesInput') updateUserRolesInput: UpdateUserRolesInput,
  ): Promise<User> {
    return this.userService.updateRoles(updateUserRolesInput);
  }

  @Mutation(() => Boolean)
  removeMyUser(@CurrentUser() { id }: Partial<User>): Promise<boolean> {
    return this.userService.remove({ id });
  }

  @Mutation(() => Boolean)
  @Roles(Role.MANAGE_USERS)
  removeUser(
    @Args('deleteUserInput') { username }: DeleteUserInput,
  ): Promise<boolean> {
    return this.userService.remove({ username });
  }
}
