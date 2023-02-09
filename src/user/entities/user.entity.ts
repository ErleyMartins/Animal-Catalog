import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
