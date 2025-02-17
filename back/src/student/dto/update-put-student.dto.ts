import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePutStudentDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  cpf: string;
}
