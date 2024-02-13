import { IsEmail, IsString } from 'class-validator';
import { AuthInput } from 'src/graphql/graphql.schema';
export class AuthUserDto extends AuthInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
