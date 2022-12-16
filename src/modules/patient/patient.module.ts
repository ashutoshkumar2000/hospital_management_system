import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Observation } from '../observation/entities/observation.entity';
import { DoctorService } from '../doctor/doctor.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, DoctorService, JwtService, UserService],
  imports: [
    TypeOrmModule.forFeature([Patient, Doctor, Observation, Test, Users]),
  ],
})
export class PatientModule {}
