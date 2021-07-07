import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/roles/roles.model";
import { UsersService } from "src/users/users.service";
import { userJwt } from "./interfaces/user-jwt.interface";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private JwtService: JwtService,
    private reflector: Reflector,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      console.log("requiredRoles", requiredRoles, !requiredRoles);

      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      const user: userJwt = this.JwtService.verify(token);
      user.roles = await this.getUserCurrentRoles(user);
      console.log("verified user", user);

      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
    }
  }
  private async getUserCurrentRoles(userToCompare: userJwt): Promise<Role[]> {
    const user = await this.userService.getUserByEmail(userToCompare.email);
    let userRoles: Role[] = user
      .getDataValue("roles")
      .map((role: any): Role => role.toJSON());

    if (userRoles !== userToCompare.roles) {
      userToCompare.roles = userRoles;
    }
    return userToCompare.roles;
  }
}
