import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { ETableName } from './enums/table-name.enum';
import { ShowroomEntity } from './showroom.entity';

@Entity(ETableName.ROLE)
export class RoleEntity extends CommonEntity {
  @Column('text')
  role: string;

  @Column('text')
  showroom_id: string;
  @ManyToOne(() => ShowroomEntity, (entity) => entity.showroom)
  @JoinColumn({ name: 'showroom_id' })
  showroom: ShowroomEntity;
}
