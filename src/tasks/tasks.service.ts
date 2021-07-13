import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreatePostDto } from "./dto/create-task.dto";
import { Task } from "./tasks.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Task) private postRepository: typeof Task,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: string) {
    const fileName: string = await this.fileService.createFile(image);
    const task: CreatePostDto = await this.postRepository.create({
      ...dto,
      image: fileName,
    });
    return task;
  }
}
