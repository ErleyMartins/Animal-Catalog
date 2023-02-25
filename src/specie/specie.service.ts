import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

import { Repository } from 'typeorm';

import { CreateSpecieInput } from './dto/create-specie.input';
import { UpdateSpecieInput } from './dto/update-specie.input';
import { Specie } from './entities/specie.entity';

@Injectable()
export class SpecieService {
  constructor(
    @InjectRepository(Specie)
    private readonly specieRepository: Repository<Specie>,
  ) {}

  async findOne(where: { id?: number; name?: string }): Promise<Specie | null> {
    const specie = await this.specieRepository.findOne({
      where,
      relations: { user: true },
    });

    if (specie) {
      return specie;
    }

    return null;
  }

  async create(
    createSpecieInput: CreateSpecieInput,
    user: Partial<User>,
  ): Promise<Specie> {
    if (await this.findOne({ name: createSpecieInput.name })) {
      throw new BadRequestException('Specie already exist');
    }

    const newSpecie = this.specieRepository.create({
      ...createSpecieInput,
      user,
    });
    return this.specieRepository.save(newSpecie);
  }

  findAll(): Promise<Specie[]> {
    return this.specieRepository.find({ order: { name: 'ASC' } });
  }

  async update(
    id: number,
    updateSpecieInput: UpdateSpecieInput,
  ): Promise<Specie> {
    if (!(await this.findOne({ id }))) {
      throw new BadRequestException('Specie entered does not exist');
    }

    const specie = this.specieRepository.create({ ...updateSpecieInput, id });
    return this.specieRepository.save(specie);
  }

  async remove(id: number): Promise<boolean> {
    if (!(await this.findOne({ id }))) {
      throw new BadRequestException('Specie entered does not exist');
    }

    const result = await this.specieRepository.delete(id);

    return result.affected > 0;
  }
}
