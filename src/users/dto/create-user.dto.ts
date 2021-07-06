import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "example@email.com",
    description: "Email пользователя",
  })
  @IsString({ message: "Электронный адрес должен быть строкой" })
  @IsEmail({}, { message: "Не корректный электронный адрес" })
  readonly email: string;
  @ApiProperty({
    example: "fsghfg45454hg",
    description: "Пароль пользователя",
  })
  @IsString({ message: "Пароль должен быть строкой" })
  @Length(4, 16, {
    message: "Пароль должен быть больше 4 и меньше 16 символов",
  })
  readonly password: string;
}
