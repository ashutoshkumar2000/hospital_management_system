import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Header,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleBasedAuth } from '../auth/role-based-auth.guard';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
@UseGuards(new JwtAuthGuard())
@UseGuards(new RoleBasedAuth())
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: any) {
    return this.doctorService.findOne(+id, headers);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
