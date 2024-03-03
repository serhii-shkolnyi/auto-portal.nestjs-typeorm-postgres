import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ETableName } from "./enums/table-name.enum";
import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

@Entity(ETableName.USER_ROLE)
export class UserRoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.userId)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @Column("text")
  roleId: string;
  @ManyToOne(() => RoleEntity, (entity) => entity.roleId)
  @JoinColumn({ name: "roleId" })
  role?: RoleEntity;
}
