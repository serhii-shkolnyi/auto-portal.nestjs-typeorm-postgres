import { Column, Entity, OneToOne } from "typeorm";

import { CarEntity } from "./car.entity";
import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";

@Entity(ETableName.OBLAST)
export class OblastEntity extends CommonEntity {
  @Column("text")
  oblast: string;

  @OneToOne(() => CarEntity, (entity) => entity.oblast)
  car?: CarEntity;
}
