import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [TypeOrmModule.forFeature([ Doctor])],
  exports: [DoctorService],
})
export class DoctorModule {}
