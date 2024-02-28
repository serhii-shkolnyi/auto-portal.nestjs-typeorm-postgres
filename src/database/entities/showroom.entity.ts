import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from './common.entity';
import { ETableName } from './enums/table-name.enum';
import { RoleEntity } from './role.entity';

@Entity(ETableName.SHOWROOM)
export class ShowroomEntity extends CommonEntity {
  @Column('text')
  showroom: string;

  @OneToMany(() => RoleEntity, (entity) => entity.showroom)
  roles: RoleEntity[];
}
