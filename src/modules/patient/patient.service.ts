import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/entities/doctor.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    private readonly doctorService: DoctorService,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    private jwtService: JwtService,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
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
  findAll() {
    return `This action returns all patient`;
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

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
