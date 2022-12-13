import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private TestRepo: Repository<Test>,
    private patientService: PatientService,
  ) {}
  async create(createTestDto: CreateTestDto) {
    const patient = await this.patientService.findOne(createTestDto.patientId);
    if (!patient) {
      return 'error';
    }
    const newMedication = await this.TestRepo.save({
      name: createTestDto.name,
      description: createTestDto.description,
    });

    // patient.medications = [...patient.TestRepo, newMedication];
    await patient.save();
    return newMedication;
  }

  getMedications(ids: number[]): Promise<Test[]> {
    return this.TestRepo.find({
      where: { id: In([...ids]) },
      relations: ['Patient'],
    });
  }

  findAll() {
    return `This action returns all medication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} medication`;
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
