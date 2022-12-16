import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({
    description: 'Name of the test',
    example: 'x-ray',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Description of the test',
    example: 'To identify the bone fracture',
  })
  @IsNotEmpty()
  description: string;
}
