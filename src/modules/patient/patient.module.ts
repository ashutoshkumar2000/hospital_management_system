import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Observation } from '../observation/entities/observation.entity';
import { DoctorService } from '../doctor/doctor.service';
import { Test } from '@nestjs/testing';

@Module({
  controllers: [PatientController],
  providers: [PatientService, DoctorService],
  imports: [TypeOrmModule.forFeature([Patient, Doctor, Observation, Test])],
})
export class PatientModule {}
