import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { Observation } from './entities/observation.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorModule } from '../doctor/doctor.module';
import { Test } from '../test/entities/test.entity';
import { TestService } from '../test/test.service';
import { Doctor } from '../doctor/entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user/entities/user.entity';

@Module({
  controllers: [ObservationController],
  providers: [ObservationService, PatientService, TestService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Patient, Observation, Test, Doctor, Users]),
    DoctorModule,
  ],
})
export class ObservationModule {}
