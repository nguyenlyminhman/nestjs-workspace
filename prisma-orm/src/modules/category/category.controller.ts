import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EApiPath, VERSION_1 } from 'objects/enums';
import { CategoryService } from './category.service';
import { ResponseOK } from 'objects/dtos/response-ok.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller({
  path: EApiPath.CATEGORY,
  version: VERSION_1,
})
@ApiTags(EApiPath.CATEGORY)
export class CategoryController {

  constructor(private categoryService: CategoryService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiOkResponse({
    description: 'fetch all category',
  })
  async fetchAll() {
    const data = await this.categoryService.fetchAll();
    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({
    description: 'Create a new category',
  })
  async creatUser(
    @Body() createUserDto: CreateCategoryDto
  ) {
    const data = await this.categoryService.create(createUserDto);
    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }
}
