import { IsNotEmpty } from 'class-validator';

export class CreateObservationDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  report: string;
  @IsNotEmpty()
  patientId: number;
  @IsNotEmpty()
  isObservedByDoctor: boolean;
  @IsNotEmpty()
  testIds: number[];
}
