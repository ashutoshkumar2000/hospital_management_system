import { Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    return this.patientRepo.findOne({
      where: { id: id },
      relations: ['observations', 'doctors'],
    });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
