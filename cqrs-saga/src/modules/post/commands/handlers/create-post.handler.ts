import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostCommand } from "../create-post.command";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand>{

    constructor(
        readonly prismaService: PrismaService
    ){}

    async execute(command: CreatePostCommand): Promise<any> {
        return await this.prismaService.post.create({ data : command.createPostDto})
    }

}