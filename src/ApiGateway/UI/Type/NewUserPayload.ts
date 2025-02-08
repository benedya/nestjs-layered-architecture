import { IsEmail, IsString, Length } from 'class-validator';

export class NewUserPayload {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  email: string;
}
