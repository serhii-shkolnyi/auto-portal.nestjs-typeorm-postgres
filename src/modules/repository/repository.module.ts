import { Global, Module } from "@nestjs/common";

import { RefreshTokenRepository } from "./repositories/refresh-token.repository";
import { RoleRepository } from "./repositories/role.repository";
import { ShowroomRepository } from "./repositories/showroom.repository";
import { UserRepository } from "./repositories/user.repository";

const repositories = [
  RefreshTokenRepository,
  RoleRepository,
  ShowroomRepository,
  UserRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
