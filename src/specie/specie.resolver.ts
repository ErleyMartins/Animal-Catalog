import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Role } from 'src/auth/role.enum';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/user/entities/user.entity';

import { SpecieService } from './specie.service';
import { Specie } from './entities/specie.entity';
import { CreateSpecieInput } from './dto/create-specie.input';
import { UpdateSpecieInput } from './dto/update-specie.input';

@Resolver(() => Specie)
export class SpecieResolver {
  constructor(private readonly specieService: SpecieService) {}

  @Mutation(() => Specie)
  @Roles(Role.REGISTER_SPECIES)
  createSpecie(
    @Args('createSpecieInput') createSpecieInput: CreateSpecieInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Specie> {
    return this.specieService.create(createSpecieInput, user);
  }

  @Query(() => [Specie], { name: 'species' })
  findAll(): Promise<Specie[]> {
    return this.specieService.findAll();
  }

  @Query(() => Specie, { name: 'specie' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Specie> {
    return this.specieService.findOne({ id });
  }

  @Mutation(() => Specie)
  @Roles(Role.REGISTER_SPECIES)
  updateSpecie(
    @Args('updateSpecieInput') updateSpecieInput: UpdateSpecieInput,
  ): Promise<Specie> {
    return this.specieService.update(updateSpecieInput.id, updateSpecieInput);
  }

  @Mutation(() => Boolean)
  @Roles(Role.REGISTER_SPECIES)
  removeSpecie(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.specieService.remove(id);
  }
}
