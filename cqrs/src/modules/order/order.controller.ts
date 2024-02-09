import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order as OrderModel } from '@prisma/client';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiFoundResponse({
    description: 'Get order list',
    type: [OrderEntity],
  })
  async getAll() {
    return this.orderService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiFoundResponse({
    description: 'Get order details',
    type: OrderEntity,
  })
  async getOne(@Param('id') id: string): Promise<OrderModel> {
    return this.orderService.getOne({ id: Number(id) });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiFoundResponse({
    description: 'create order',
    type: OrderEntity,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiFoundResponse({
    description: 'update order status',
    type: OrderEntity,
  })
  async update(@Param('id') id: string, @Body() status: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(+id, status);
  }
}
