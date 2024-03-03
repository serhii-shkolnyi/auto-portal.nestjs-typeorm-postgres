import { Column, Entity, OneToMany } from "typeorm";

import { CarEntity } from "./car.entity";
import { CommonEntity } from "./common.entity";
import { EAccountStatus, EAccountType } from "./enums/account.enum";
import { ETableName } from "./enums/table-name.enum";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { UserRoleEntity } from "./user&role.entity";

@Entity(ETableName.USER)
export class UserEntity extends CommonEntity {
  @Column("text")
  userName: string;

  @Column("int", { unique: true })
  phone: number;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column("enum", { enum: EAccountType, default: EAccountType.BASIC })
  accountType: string;

  @Column("enum", { enum: EAccountStatus, default: EAccountStatus.INACTIVE })
  accountStatus: string;

  @Column("text", { nullable: true })
  avatar?: string;

  @OneToMany(() => UserRoleEntity, (entity) => entity.user)
  userId: UserRoleEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
