import { Order } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  price: string;

  @ApiProperty({ required: false, nullable: true })
  status: string | null;
}
