import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'Name of the doctor', example: 'Dr. Vishal' })
  name: string;
  @ApiProperty({
    description: 'Email of the doctor',
    example: 'vashisht.vishal@gmail.com',
  })
  email: string;
}
