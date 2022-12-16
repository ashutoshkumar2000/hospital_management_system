import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the User',
    example: 'Vishal Vashisht',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the User',
    example: 'Vishal.Vashisht@xyz.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's Passwoed",
    example: 'Pass@123468',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the User',
    example: 'doctor',
  })
  @IsNotEmpty()
  role: string;
}

export class GetUserDto {
  @ApiProperty({
    description: 'Email of the User',
    example: 'Vishal.Vashisht@xyz.com',
  })
  @IsNotEmpty()
  email: string;
}
