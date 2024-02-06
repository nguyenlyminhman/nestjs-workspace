import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import PaginationDto from './pagination.dto';

export class QueryForGetDto {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  private pageSize: number;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  csvExport: boolean;

  @IsOptional()
  @IsString()
  private fromDate: string;

  @IsOptional()
  @IsString()
  private toDate: string;

  date() {
    return {
      fromDate: this.fromDate || undefined,
      toDate: this.toDate ? `${this.toDate} 23:59:59` : undefined,
    };
  }
  
  pagination(): PaginationDto {
    return new PaginationDto(this.page, this.pageSize);
  }
}
