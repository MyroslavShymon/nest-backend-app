import { Module } from "@nestjs/common";
import { PostsService } from "./tasks.service";
import { PostsController } from "./tasks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Task } from "./tasks.model";
import { User } from "src/users/users.model";
import { FilesModule } from "src/files/files.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Task]), FilesModule],
})
export class PostsModule {}
