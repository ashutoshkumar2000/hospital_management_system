import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';

@Injectable()
export class ObservationService {
  constructor(@InjectRepository(Observation) private observationRepo:Repository<Observation>, private patientService : PatientService){}
  async create(createObservationDto: CreateObservationDto) {
    const patient = await this.patientService.findOne(createObservationDto.patientId);
    if(!patient){
      return "error";
    }
    const newObs = await this.observationRepo.save({
      name:createObservationDto.name,
      report: createObservationDto.report
    });
    patient.observations = [...patient.observations, newObs];
    await patient.save();
    return newObs;
  }

  findAll() {
    return `This action returns all observation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observation`;
  }

  update(id: number, updateObservationDto: UpdateObservationDto) {
    return `This action updates a #${id} observation`;
  }

  remove(id: number) {
    return `This action removes a #${id} observation`;
  }
}
