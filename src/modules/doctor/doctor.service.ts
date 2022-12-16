import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    private jwtService: JwtService
    ) {}
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepo.save({
      name: createDoctorDto.name,
      email: createDoctorDto.email,
    });
  }

  getDoctors(ids: number[]): Promise<Doctor[]> {
    return this.doctorRepo.find({
      where: { id: In([...ids]) },
      relations: ['patients'],
    });
  }

  findAll() {
    return `This action returns all doctor`;
  }
  async findOne(id: number, headers: any) {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['patients'],
    });
    const userData: any = this.jwtService.decode(
      headers.authorization.split(' ')[1],
    );
    if (doctor.email !== userData.email) {
      return 'Not found!';
    }
    return doctor;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
