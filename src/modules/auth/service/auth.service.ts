import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { RefreshTokenRepository } from "../../repository/repositories/refresh-token.repository";
import { RoleRepository } from "../../repository/repositories/role.repository";
import { ShowroomRepository } from "../../repository/repositories/showroom.repository";
import { UserRepository } from "../../repository/repositories/user.repository";
import { UserRoleRepository } from "../../repository/repositories/user-role.repository";
import { UserService } from "../../user/service/user.service";
import { SignUpRequestDto } from "../dto/request/sign-up.request.dto";
import { AuthUserResponseDto } from "../dto/response/auth-user.response.dto";
import { AuthMapper } from "../mappers/auth.mapper";
import { AuthCacheService } from "./auth-cache.service";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly showroomRepository: ShowroomRepository,
  ) {}

  public async signUp(dto: SignUpRequestDto): Promise<AuthUserResponseDto> {
    await this.userService.isEmailUniqueOrThrow(dto.email);

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const autoPortal = await this.showroomRepository.findOneBy({
      showroom: "auto-portal",
    });
    const roleSeller = await this.roleRepository.findOneBy({
      showroom_id: autoPortal.id,
      role: "seller",
    });
    await this.userRoleRepository.save(
      this.userRoleRepository.create({
        userId: user.id,
        roleId: roleSeller.id,
      }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      roleId: roleSeller.id,
    });

    const userAndRole = await this.userRepository.findOne({
      where: { id: "e1560d2f-1abf-4757-be91-92f274cfc325" },
      relations: { userId: true },
    });
    console.log(userAndRole.userId);
    // await Promise.all([
    //   this.refreshRepository.saveToken(
    //     user.id,
    //     dto.deviceId,
    //     tokens.refreshToken,
    //   ),
    //   this.authCacheService.saveToken(user.id, tokens.accessToken),
    // ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  // public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
  //   const userEntity = await this.userRepository.findOne({
  //     where: { email: dto.email },
  //     select: { id: true, password: true },
  //   });
  //   if (!userEntity) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const isPasswordsMatch = await bcrypt.compare(
  //     dto.password,
  //     userEntity.password,
  //   );
  //
  //   if (!isPasswordsMatch) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const user = await this.userRepository.findOneBy({ id: userEntity.id });
  //
  //   const tokens = await this.tokenService.generateAuthTokens({
  //     userId: user.id,
  //     deviceId: dto.deviceId,
  //   });
  //
  //   await Promise.all([
  //     this.refreshRepository.delete({
  //       user_id: user.id,
  //       deviceId: dto.deviceId,
  //     }),
  //     this.authCacheService.removeToken(user.id),
  //   ]);
  //
  //   await Promise.all([
  //     this.refreshRepository.saveToken(
  //       user.id,
  //       dto.deviceId,
  //       tokens.refreshToken,
  //     ),
  //     this.authCacheService.saveToken(user.id, tokens.accessToken),
  //   ]);
  //
  //   return AuthMapper.toResponseDto(user, tokens);
  // }
  //
  // public async logout(userData: IUserData): Promise<void> {
  //   await Promise.all([
  //     this.refreshRepository.delete({
  //       user_id: userData.userId,
  //       deviceId: userData.deviceId,
  //     }),
  //     this.authCacheService.removeToken(userData.userId),
  //   ]);
  // }
  //
  // public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
  //   const user = await this.userRepository.findOneBy({
  //     id: userData.userId,
  //   });
  //
  //   await Promise.all([
  //     this.refreshRepository.delete({
  //       user_id: user.id,
  //       deviceId: userData.deviceId,
  //     }),
  //     this.authCacheService.removeToken(user.id),
  //   ]);
  //
  //   const tokens = await this.tokenService.generateAuthTokens({
  //     userId: user.id,
  //     deviceId: userData.deviceId,
  //   });
  //
  //   await Promise.all([
  //     this.refreshRepository.saveToken(
  //       user.id,
  //       userData.deviceId,
  //       tokens.refreshToken,
  //     ),
  //     this.authCacheService.saveToken(user.id, tokens.accessToken),
  //   ]);
  //   return tokens;
  // }
}
