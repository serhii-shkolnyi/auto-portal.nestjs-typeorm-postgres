import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Length, Matches } from "class-validator";

import { TransformHelper } from "../../../../common/helpers/transform.helper";
import {
  EAccountStatus,
  EAccountType,
} from "../../../../database/entities/enums/account.enum";
import { regexConstant } from "../../constant/regex.constant";

export class BaseUserRequestDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  userName: string;

  @ApiProperty({ example: "+38(077)777-77-77" })
  @IsString()
  @Matches(regexConstant.PHONE)
  phone: string;

  @ApiProperty({ example: "test@gmail.com" })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.EMAIL)
  email: string;

  @ApiProperty({ example: "Qwerty123" })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.PASSWORD)
  password: string;

  @IsOptional()
  @IsEnum(EAccountType)
  accountType?: string;

  @IsOptional()
  @IsEnum(EAccountStatus)
  accountStatus?: string;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  avatar?: string;
}
