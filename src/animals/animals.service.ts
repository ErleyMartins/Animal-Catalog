import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async findOne(where: { id?: number; name?: string }): Promise<Animal | null> {
    const animal = await this.animalRepository.findOne({
      where,
      relations: { user: true },
    });

    if (animal) {
      return animal;
    }

    return null;
  }

  async create(
    createAnimalInput: CreateAnimalInput,
    user: Partial<User>,
  ): Promise<Animal> {
    if (await this.findOne({ name: createAnimalInput.name })) {
      throw new BadRequestException('Animal already exist');
    }

    const newAnimal = this.animalRepository.create({
      ...createAnimalInput,
      user,
    });

    return this.animalRepository.save(newAnimal);
  }

  findAll() {
    return this.animalRepository.find({ order: { name: 'ASC' } });
  }

  async update(updateAnimalInput: UpdateAnimalInput): Promise<Animal> {
    if (!(await this.findOne({ id: updateAnimalInput.id }))) {
      throw new BadRequestException('Animal entered does not exist');
    }

    const animal = this.animalRepository.create(updateAnimalInput);
    return this.animalRepository.save(animal);
  }

  async remove(id: number): Promise<boolean> {
    if (!(await this.findOne({ id }))) {
      throw new BadRequestException('Animal entered does not exist');
    }

    const result = await this.animalRepository.delete(id);
    return result.affected > 0;
  }
}
