import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { Task } from "src/tasks/tasks.model";
import { Role } from "src/roles/roles.model";
import { RolesModule } from "src/roles/roles.module";
import { UserRoles } from "src/roles/user-roles.model";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Role, UserRoles, Task]),
    forwardRef(() => RolesModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
