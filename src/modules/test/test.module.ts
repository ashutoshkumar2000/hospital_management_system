import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorModule } from '../doctor/doctor.module';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Observation } from '../observation/entities/observation.entity';
import { Test } from './entities/test.entity';

@Module({
  controllers: [TestController],
  providers: [TestService, PatientService],
  imports: [
    TypeOrmModule.forFeature([Patient, Observation, Test, Doctor]),
    DoctorModule,
  ],
})
export class TestModule {}
