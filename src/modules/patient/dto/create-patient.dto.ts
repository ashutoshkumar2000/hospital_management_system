import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Name of the patient',
    example: 'Vishal Vashisht',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of patient',
    example: 'vashisht.vishal@xyz.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Ids of doctor',
    example: [1, 2],
  })
  @IsNotEmpty()
  doctorIds: number[];

  @ApiProperty({
    description: 'Date of birth',
    example: '1987-01-05T18:30:00.000Z',
  })
  @IsNotEmpty()
  dob: Date;
}
