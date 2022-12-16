import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleBasedAuth } from '../auth/role-based-auth.guard';

@Controller('patient')
@UseGuards(new RoleBasedAuth())
 
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: Headers) {
    return await this.patientService.findOne(+id, headers);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
