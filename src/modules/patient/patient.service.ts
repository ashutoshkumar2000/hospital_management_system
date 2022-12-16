/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Users } from '../user/entities/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    private readonly doctorService: DoctorService,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) { }
  async create(createPatientDto: CreatePatientDto, headers: any) {
    if (createPatientDto.email !== headers.email) {
      return {
        message: 'Something went wrong',
        error: 'Email not found',
      };
    }
    const doctors: Doctor[] = await this.doctorService.getDoctors(
      createPatientDto.doctorIds,
    );
    if (doctors.length !== createPatientDto.doctorIds.length) return 'error';
    const newPatient = await this.patientRepo.save({
      name: createPatientDto.name,
      email: createPatientDto.email,
      dob: createPatientDto.dob,
    });
    doctors.forEach(async (doctor) => {
      doctor.patients = [...doctor.patients, newPatient];
      await doctor.save();
    });
    return newPatient;
  }
  async findAll(header: any, size: number, page: number) {
    const user = await this.userRepo.findOne({
      where: { email: header.email },
    });

    if (user.role === 'admin') {
      return this.patientRepo.find({ skip: (page - 1) * size, take: size });
    } else {
      return {
        message: 'Unauthorized attempt',
      };
    }
  }

  getPatients(ids: number[]): Promise<Patient[]> {
    return this.patientRepo.find({
      where: { id: In([...ids]) },
      relations: ['patients'],
    });
  }
  async find(id: number) {
    const report = await this.patientRepo.findOne({
      where: { id: id },
      relations: ['observations', 'doctors'],
    });
    return report;
  }

  async findOne(id: number, headers: any) {
    const report = await this.find(id);
    const userData: any = this.jwtService.decode(
      headers.authorization.split(' ')[1],
    );
    if (report?.email !== userData.email) {
      return {
        code: 401,
        message: 'Please log in again! URL corruption occured!!!',
      };
    }
    return report;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto, headers: any) {
    const user = await this.userRepo.findOne({
      where: { email: headers.email },
    });

    if (user.role == 'admin' || user.role == 'Patient')
      return this.patientRepo.update(id, updatePatientDto);
    else {
      return {
        message: 'Something went wrong',
        error: 'Email not found',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
