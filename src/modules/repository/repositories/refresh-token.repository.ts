import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { RefreshTokenEntity } from "../../../database/entities/refresh-token.entity";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async saveToken(
    userId: string,
    token: string,
  ): Promise<RefreshTokenEntity> {
    return await this.save(
      this.create({
        userId: userId,
        refreshToken: token,
      }),
    );
  }

  public async isTokenExist(token: string): Promise<boolean> {
    return await this.exists({
      where: { refreshToken: token },
    });
  }
}
