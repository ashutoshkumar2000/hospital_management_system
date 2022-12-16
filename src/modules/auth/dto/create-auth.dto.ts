import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Email id of the user',
    example: 'abc@xyz.com',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: "User's password",
    example: 'x-ray',
  })
  @IsNotEmpty()
  password: string;
}
