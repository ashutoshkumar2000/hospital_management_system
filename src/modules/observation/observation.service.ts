import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { Test } from '../test/entities/test.entity';
import { TestService } from '../test/test.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private observationRepo: Repository<Observation>,
    private patientService: PatientService,
    private testService: TestService,
  ) { }
  async create(createObservationDto: CreateObservationDto) {
    const patient = await this.patientService.find(
      createObservationDto.patientId,
    );
    const tests: Test[] = await this.testService.getTests(
      createObservationDto.testIds,
    );
    if (!patient || !tests) {
      return 'Please Get Out!';
    }
    const newObs = await this.observationRepo.save({
      name: createObservationDto.name,
      report: createObservationDto.report,
      isObservedByDoctor: createObservationDto.isObservedByDoctor,
    });
    patient.observations = [...patient.observations, newObs];
    // const promises: Promise<Test>[] = [];
    tests.forEach(async (test) => {
      test.observations = [...test.observations, newObs];
      await test.save();
    });
    await patient.save();
    return newObs;
  }

  findAll() {
    return this.observationRepo.find({ relations: ['patient', 'tests'] });
  }

  findOne(id: number) {
    return this.observationRepo.findOne({
      where: { id },
      relations: ['patient', 'tests'],
    });
  }
}
