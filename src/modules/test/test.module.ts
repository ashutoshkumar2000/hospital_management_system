import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorModule } from '../doctor/doctor.module';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test } from '@nestjs/testing';

@Module({
  controllers: [TestController],
  providers: [TestService, PatientService],
  imports: [TypeOrmModule.forFeature([Patient, Test]), DoctorModule],
})
export class TestModule {}
