import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    example: "Админ",
    description: "Название роли",
  })
  readonly value: string;
  @ApiProperty({
    example: "Может банить других пользоватилей(самый главный)",
    description: "Разъясненияе роли",
  })
  readonly description: string;
}
