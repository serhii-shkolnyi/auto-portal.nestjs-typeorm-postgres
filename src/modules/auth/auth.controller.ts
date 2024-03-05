import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { SkipAuth } from "./decorators/skip-auth.decorator";
import { SignUpRequestDto } from "./dto/request/sign-up.request.dto";
import { AuthUserResponseDto } from "./dto/response/auth-user.response.dto";
import { AuthService } from "./service/auth.service";

@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: "Registration" })
  @Post("sign-up")
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  // @SkipAuth()
  // @ApiOperation({ summary: "Login" })
  // @Post("sign-in")
  // public async signIn(
  //   @Body() dto: SignInRequestDto,
  // ): Promise<AuthUserResponseDto> {
  //   return await this.authService.signIn(dto);
  // }
  //
  // @ApiBearerAuth()
  // @ApiOperation({ summary: "Logout" })
  // @Post("logout")
  // public async logout(@CurrentUser() userData: IUserData): Promise<void> {
  //   await this.authService.logout(userData);
  // }
  //
  // @SkipAuth()
  // @ApiBearerAuth()
  // @UseGuards(JwtRefreshGuard)
  // @ApiOperation({ summary: "Update token pair" })
  // @Post("refresh")
  // public async updateRefreshToken(
  //   @CurrentUser() userData: IUserData,
  // ): Promise<TokenResponseDto> {
  //   return await this.authService.refreshToken(userData);
  // }
}
