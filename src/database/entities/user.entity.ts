import { Column, Entity } from 'typeorm';

import { CommonEntity } from './common.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @Column('text', { nullable: true })
  name?: string;

  @Column('text')
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('int', { nullable: true })
  age: number;
}
