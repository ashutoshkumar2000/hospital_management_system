import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}

export enum Role {
  Doctor = 'doctor',
  Patient = 'patient',
  Staff = 'staff',
}

export class GetUserDto {
  @IsNotEmpty()
  email: string;
}
