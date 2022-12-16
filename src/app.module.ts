import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ObservationModule } from './modules/observation/observation.module';
import { PatientModule } from './modules/patient/patient.module';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TestModule,
    ObservationModule,
    DoctorModule,
    PatientModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
