import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    if ((await this.findOne({ role: createRoleInput.role.trim() })) !== null) {
      throw new BadRequestException('Role already exists');
    }

    const newRole = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(newRole);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne({ id, role }: { id?: number; role?: string }): Promise<Role | null> {
    return this.roleRepository.findOne({ where: id ? { id } : { role } });
  }

  async update(updateRoleInput: UpdateRoleInput): Promise<Role> {
    if ((await this.findOne({ id: updateRoleInput.id })) === null) {
      throw new BadRequestException('Role entered does not exist');
    }

    const role = this.roleRepository.create(updateRoleInput);
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<boolean> {
    if ((await this.findOne({ id })) === null) {
      throw new BadRequestException('Role entered does not exist');
    }

    const result = await this.roleRepository.delete(id);
    return result.affected > 0;
  }
}
