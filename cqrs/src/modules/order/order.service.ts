import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.order.findMany({});
  }

  async getOne(input: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
    return await this.prisma.order.findUnique({ where: input });
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({ data: createOrderDto });
  }

  async updateStatus(id: number, orderStatusDto: UpdateOrderStatusDto) {
    return await this.prisma.order.update({
      where: { id },
      data: orderStatusDto,
    });
  }
}
