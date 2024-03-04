import { UserEntity } from "../../../database/entities/user.entity";
import { UserResponseDto } from "../dto/response/user.response.dto";

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      userName: userEntity.userName,
      phone: userEntity.phone,
      email: userEntity.email,
      password: userEntity.password,
      accountType: userEntity.accountType,
      accountStatus: userEntity.accountStatus,
      avatar: userEntity.avatar,
    };
  }
}
