import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "../configs/api.config";
import { PostgresModule } from "./postgres/postgres.module";
import { RedisModule } from "./redis/redis.module";
import { RepositoryModule } from "./repository/repository.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RepositoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
