import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { Observation } from './entities/observation.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  controllers: [ObservationController],
  providers: [ObservationService, PatientService],
  imports: [TypeOrmModule.forFeature([Patient, Observation]), DoctorModule],
})
export class ObservationModule {}
