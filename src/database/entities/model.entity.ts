import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { BrandEntity } from "./brand.entity";
import { CarEntity } from "./car.entity";
import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";

@Entity(ETableName.MODEL)
export class ModelEntity extends CommonEntity {
  @Column("text")
  model: string;

  @Column("uuid")
  brandId: string;
  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: "brandId" })
  brand?: BrandEntity;

  @OneToOne(() => CarEntity, (entity) => entity.model)
  car?: CarEntity;
}
