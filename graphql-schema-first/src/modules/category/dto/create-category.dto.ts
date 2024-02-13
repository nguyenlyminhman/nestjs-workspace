import { IsString } from 'class-validator';
import { CreateCategoryInput } from 'src/graphql/graphql.schema';

export class CreateCategoryDto extends CreateCategoryInput {
  @IsString()
  name: string;
}
