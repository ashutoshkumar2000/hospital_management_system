import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private TestRepo: Repository<Test>,
    private patientService: PatientService,
  ) { }
  async create(createTestDto: CreateTestDto) {
    const newTest = await this.TestRepo.save({
      name: createTestDto.name,
      description: createTestDto.description,
    });
    return newTest;
  }

  getTests(ids: number[]): Promise<Test[]> {
    return this.TestRepo.find({
      where: { id: In([...ids]) },
      relations: ['observations'],
    });
  }

  findAll() {
    return this.TestRepo.find({ relations: ['observations'] });
  }

  findOne(id: number) {
    return this.TestRepo.findOne({
      where: { id },
      relations: ['observations'],
    });
  }
}
