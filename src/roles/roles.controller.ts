import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
  @Get()
  queryTest(@Query() query) {
    console.log("query", query);
  }
}
