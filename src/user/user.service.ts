import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { SALT_OR_ROUNDS } from 'src/utils/constants';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UpdateUserRolesInput } from './dto/update-user-roles.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    if (await this.findOne({ username: createUserInput.username })) {
      throw new BadRequestException('User already exist');
    }

    const password = await hash(createUserInput.password, SALT_OR_ROUNDS);
    const newUser = this.userRepository.create({
      ...createUserInput,
      password,
    });

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { roles: true } });
  }

  async findOne({
    id,
    username,
  }: {
    id?: string;
    username?: string;
  }): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: id ? { id } : { username },
      relations: { roles: true },
    });
    if (user) return user;

    return null;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if ((await this.findOne({ id })) === null) {
      throw new BadRequestException('User entered does not exist');
    }

    const password = await hash(updateUserInput.password, SALT_OR_ROUNDS);
    const user = this.userRepository.create({
      ...updateUserInput,
      id,
      password,
    });

    return this.userRepository.save(user);
  }

  async updateRoles(updateUserRolesInput: UpdateUserRolesInput): Promise<User> {
    if ((await this.findOne({ id: updateUserRolesInput.id })) === null) {
      throw new BadRequestException('User entered does not exist');
    }

    const user = this.userRepository.create({
      ...updateUserRolesInput,
    });

    return this.userRepository.save(user);
  }

  async remove({
    id,
    username,
  }: {
    id?: string;
    username?: string;
  }): Promise<boolean> {
    let userId = id;
    if (username) {
      const user = await this.findOne({ username });
      if (!user) {
        throw new BadRequestException('User entered does not exist');
      }

      userId = user.id;
    }

    const result = await this.userRepository.delete(userId);
    return result.affected > 0;
  }
}
