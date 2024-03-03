import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { CarEntity } from "./car.entity";
import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";

@Entity(ETableName.VIEWS_CAR)
export class ViewsCarEntity extends CommonEntity {
  @Column("int")
  view: number;

  @Column("text")
  carId: string;
  @OneToOne(() => CarEntity, (entity) => entity.view)
  @JoinColumn({ name: "carId" })
  car?: CarEntity;
}
