import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "example@email.com",
    description: "Email пользователя",
  })
  readonly email: string;
  @ApiProperty({
    example: "fsghfg45454hg",
    description: "Пароль пользователя",
  })
  readonly password: string;
}
