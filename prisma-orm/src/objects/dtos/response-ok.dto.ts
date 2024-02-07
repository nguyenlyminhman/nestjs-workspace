import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResponseOK {
  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  payload: any;

  constructor(code: number, message: string, payload: any) {
    this.statusCode = code;
    this.message = message;
    this.payload = payload;
  }
}
