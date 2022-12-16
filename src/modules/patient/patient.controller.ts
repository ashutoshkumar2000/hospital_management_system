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
  constructor(private readonly patientService: PatientService) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Headers() headers: any) {
    return this.patientService.create(createPatientDto, headers);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':pageWidth/:pageSize')
  findAll(
    @Param('pageWidth') pageWidth: number,
    @Param('pageSize') pageSize: number,
    @Headers() headers: Headers,
  ) {
    return this.patientService.findAll(headers, pageWidth, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: Headers) {
    return await this.patientService.findOne(+id, headers);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Headers() headers: any,
  ) {
    return this.patientService.update(+id, updatePatientDto, headers);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
