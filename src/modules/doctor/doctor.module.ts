import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Observation } from '../observation/entities/observation.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Test } from '../test/entities/test.entity';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [TypeOrmModule.forFeature([Patient, Observation, Test, Doctor])],
  exports: [DoctorService],
})
export class DoctorModule {}
