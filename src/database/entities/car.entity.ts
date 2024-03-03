import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { BrandEntity } from "./brand.entity";
import { CommonEntity } from "./common.entity";
import { ECarStatus } from "./enums/car.enum";
import { ECurrency } from "./enums/currency.enum";
import { ETableName } from "./enums/table-name.enum";
import { ModelEntity } from "./model.entity";
import { OblastEntity } from "./oblast.entity";
import { UserEntity } from "./user.entity";
import { ViewsCarEntity } from "./views-car.entity";

@Entity(ETableName.CAR)
export class CarEntity extends CommonEntity {
  @Column("uuid")
  brandId: string;

  @Column("uuid")
  modelId: string;

  @Column("int")
  year: number;

  @Column("text")
  description: string;

  @Column("text")
  oblastId: string;

  @Column("int")
  price: number;

  @Column("enum", { enum: ECurrency })
  currency: string;

  @Column("enum", { enum: ECarStatus, default: ECarStatus.INACTIVE })
  carStatus: string;

  @Column("text", { nullable: true })
  avatar?: string;

  @Column("text")
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @OneToOne(() => ViewsCarEntity, (entity) => entity.car)
  view?: ViewsCarEntity;

  @OneToOne(() => BrandEntity, (entity) => entity.car)
  @JoinColumn({ name: "brandId" })
  brand?: BrandEntity;

  @OneToOne(() => ModelEntity, (entity) => entity.car)
  @JoinColumn({ name: "modelId" })
  model?: ModelEntity;

  @OneToOne(() => OblastEntity, (entity) => entity.car)
  @JoinColumn({ name: "oblastId" })
  oblast?: OblastEntity;
}
