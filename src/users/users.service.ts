import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("User");
    await user.$set("roles", [role.id]);
    // console.log("Before user.roles", role);

    user.roles = [role];
    console.log("Before user.roles", user.roles);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return users;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      // console.log("user before", user.roles);
      await user.$add("roles", role.id);
      // console.log("user after", user.roles);

      return dto;
    }
    throw new HttpException(
      "Пользователь или пароль не найдены",
      HttpStatus.NOT_FOUND
    );
  }

  async ban(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.value;
    await user.save();
    return user;
  }
}
