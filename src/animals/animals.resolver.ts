import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Animal> {
    return this.animalsService.create(createAnimalInput, user);
  }

  @Query(() => [Animal], { name: 'animals' })
  findAll(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  @Query(() => Animal, { name: 'animal' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Animal> {
    return this.animalsService.findOne({ id });
  }

  @Mutation(() => Animal)
  updateAnimal(
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    return this.animalsService.update(updateAnimalInput);
  }

  @Mutation(() => Boolean)
  removeAnimal(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.animalsService.remove(id);
  }
}
