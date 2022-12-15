import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ObservationModule } from './modules/observation/observation.module';
import { PatientModule } from './modules/patient/patient.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TestModule,
    ObservationModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
