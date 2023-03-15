import { Injectable } from '@nestjs/common';
import { user, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService{
    constructor(private prisma: PrismaService) {}

    async users(){
        return this.prisma.user.findMany({});
    }
}
