import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  ra: string;

  @IsString()
  @MinLength(11)
  cpf: string;
}
