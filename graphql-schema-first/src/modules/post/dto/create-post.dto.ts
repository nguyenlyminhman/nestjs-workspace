import { IsNumber, IsString } from 'class-validator';
import { CreatePostInput } from 'src/graphql/graphql.schema';

export class CreatePostDto extends CreatePostInput {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  category: number;
}
