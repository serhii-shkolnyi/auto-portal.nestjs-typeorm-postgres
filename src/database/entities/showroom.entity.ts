import { Column, Entity } from 'typeorm';

import { CommonEntity } from './common.entity';
import { ETableName } from './enums/table-name.enum';

@Entity(ETableName.SHOWROOM)
export class ShowroomEntity extends CommonEntity {
  @Column('text')
  showroom: string;
}
