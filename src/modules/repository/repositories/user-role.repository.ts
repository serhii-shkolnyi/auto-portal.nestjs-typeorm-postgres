import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { UserRoleEntity } from "../../../database/entities/user&role.entity";

@Injectable()
export class UserRoleRepository extends Repository<UserRoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRoleEntity, dataSource.manager);
  }
}
