import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  doctorIds: number[];
  @IsNotEmpty()
  dob: Date;
}
