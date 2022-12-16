import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateObservationDto {
  @ApiProperty({
    description: 'Name of the Observation',
    example: 'high fever',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'carried out report',
    example: 'Covid +ve',
  })
  @IsNotEmpty()
  report: string;
  @ApiProperty({
    description: 'Id of the patient',
    example: '1',
  })
  @IsNotEmpty()
  patientId: number;
  @ApiProperty({
    description: 'Whether the report is taken out by doctor or not',
    example: 'true',
  })
  @IsNotEmpty()
  isObservedByDoctor: boolean;
  @ApiProperty({
    description: 'Array of tests done',
    example: [1, 2],
  })
  @IsNotEmpty()
  testIds: number[];
}
