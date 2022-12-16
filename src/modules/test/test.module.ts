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
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { DoctorService } from '../doctor/doctor.service';
import { Users } from '../user/entities/user.entity';

@Module({
  controllers: [TestController],
  providers: [TestService, PatientService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Patient, Observation, Test, Doctor, Users]),
    DoctorModule,
  ],
})
export class TestModule {}
