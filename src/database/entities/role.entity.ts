import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { CommonEntity } from "./common.entity";
import { ETableName } from "./enums/table-name.enum";
import { ShowroomEntity } from "./showroom.entity";
import { UserRoleEntity } from "./user&role.entity";

@Entity(ETableName.ROLE)
export class RoleEntity extends CommonEntity {
  @Column("text")
  role: string;

  @Column("text")
  showroom_id: string;
  @ManyToOne(() => ShowroomEntity, (entity) => entity.roles)
  @JoinColumn({ name: "showroom_id" })
  showroom?: ShowroomEntity;

  @OneToMany(() => UserRoleEntity, (entity) => entity.role)
  roleId: UserRoleEntity[];
}
