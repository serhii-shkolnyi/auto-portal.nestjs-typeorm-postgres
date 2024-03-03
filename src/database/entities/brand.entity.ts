import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import { CarEntity } from "./car.entity";
import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";
import { ModelEntity } from "./model.entity";

@Entity(ETableName.BRAND)
export class BrandEntity extends CommonEntity {
  @Column("text")
  brand: string;

  @OneToOne(() => CarEntity, (entity) => entity.brand)
  car?: CarEntity;

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity[];
}
