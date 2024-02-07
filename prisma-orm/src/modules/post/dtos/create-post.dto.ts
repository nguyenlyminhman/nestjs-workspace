import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto{
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    author_id: number;

    @ApiProperty()
    @IsNumber()
    category_id: number;
}

