import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }

	async getUser(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async create(createUserDto: CreateUserDto): Promise<User> {

		const result = await this.prisma.user.create({
			data: {
				email: createUserDto.email,
				password: createUserDto.password
			},
		});

		return result;
	}

	async getUserByEmail (email: string) {
		return await this.prisma.user.findFirst({where: {email: email}});
	}


}
