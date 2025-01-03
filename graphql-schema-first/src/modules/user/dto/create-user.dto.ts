import { IsArray, IsEmail, IsString } from 'class-validator';
import { CreateUserInput } from 'src/graphql/graphql.schema';
export class CreateUserDto extends CreateUserInput {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  permissions: string[];
}
