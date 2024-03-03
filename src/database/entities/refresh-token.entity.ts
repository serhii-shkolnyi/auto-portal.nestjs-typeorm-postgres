import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";
import { UserEntity } from "./user.entity";

@Entity(ETableName.REFRESH_TOKEN)
export class RefreshTokenEntity extends CommonEntity {
  @Column("text")
  refreshToken: string;

  @Column("text")
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;
}
