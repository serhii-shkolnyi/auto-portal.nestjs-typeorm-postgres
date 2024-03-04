import { PickType } from "@nestjs/swagger";

import { BaseUserRequestDto } from "./base-user.request.dto";

export class UpdateUserRequestDto extends PickType(BaseUserRequestDto, [
  "userName",
  "avatar",
  "password",
]) {}
