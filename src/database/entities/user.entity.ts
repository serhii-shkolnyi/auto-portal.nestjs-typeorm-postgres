import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { CommonEntity } from './common.entity';
import { EAccountStatus, EAccountType } from './enums/account.enum';
import { ETableName } from './enums/table-name.enum';
import { RoleEntity } from './role.entity';

@Entity(ETableName.USER)
export class UserEntity extends CommonEntity {
  @Column('text')
  userName: string;

  @Column('int', { unique: true })
  phone: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('enum', { enum: EAccountType, default: EAccountType.BASIC })
  accountType: string;

  @Column('enum', { enum: EAccountStatus, default: EAccountStatus.INACTIVE })
  accountStatus: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @ManyToMany(() => RoleEntity, (entity) => entity.users)
  @JoinTable()
  roles?: RoleEntity[];
}
