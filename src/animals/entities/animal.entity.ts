import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Animal {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  scientistName: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  photo: string;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => String)
  user: User;
}
