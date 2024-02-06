import { HttpStatus } from '@nestjs/common';

export default interface IDataResponse {
  code?: HttpStatus;
  message?: string;
  results?: any;
  total?: number;
  page?: number;
  pageSize?: number;
}
