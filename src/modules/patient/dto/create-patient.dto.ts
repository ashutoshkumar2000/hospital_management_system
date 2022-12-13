export class CreatePatientDto {
  name: string;
  email: string;
  doctorIds: number[];
  medicationIds?: number[];
  observationIds?: number[];
  firstVisit: Date;
  recentVisit: Date;
}
