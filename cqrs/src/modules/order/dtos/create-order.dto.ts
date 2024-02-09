import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  price: string;

  @ApiProperty({ required: false })
  status: string;
}
