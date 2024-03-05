import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { RedisModule } from "../redis/redis.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { JwtAccessGuard } from "./guards/jwt-access.guard";
import { AuthService } from "./service/auth.service";
import { AuthCacheService } from "./service/auth-cache.service";
import { TokenService } from "./service/token.service";

@Module({
  imports: [JwtModule, RedisModule, UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [AuthCacheService],
})
export class AuthModule {}
