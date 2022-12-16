import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Users } from '../user/entities/user.entity';
import { Role } from 'enums/roles.enum';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) { }
  create(createDoctorDto: CreateDoctorDto, headers: any) {
    const newUser = {
      name: createDoctorDto.name,
      email: createDoctorDto.email,
    };

    if (newUser.email !== headers.email) {
      return {
        message: 'Something went wrong',
        error: 'Email not found',
      };
    }

    return this.doctorRepo.save(newUser);
  }

  getDoctors(ids: number[]): Promise<Doctor[]> {
    return this.doctorRepo.find({
      where: { id: In([...ids]) },
      relations: ['patients'],
    });
  }

  async findAll(header: any, size: number, page: number) {
    const user = await this.userRepo.findOne({
      where: { email: header.email },
    });

    if (user.role === Role.Admin) {
      return this.doctorRepo.find({ skip: (page - 1) * size, take: size });
    } else {
      return {
        message: 'Unauthorized attempt',
      };
    }
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
    return this.doctorRepo.update(id, updateDoctorDto);
  }
}
