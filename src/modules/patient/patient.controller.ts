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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import {
  PatientDeleteSuccessResponse,
  ErrorResponse,
} from '../swagger-api-responses/ApiResponses';
import { Role } from 'enums/roles.enum';

@ApiBadRequestResponse({
  description: 'request failed',
  type: ErrorResponse,
})
@ApiBearerAuth()
@ApiHeader({ name: 'email', description: 'xyz@abc.com' })
@ApiHeader({
  name: 'role',
  description: 'user roles',
  enum: Role,
})
@ApiTags('Patient')
@Controller('patient')
@UseGuards(new RoleBasedAuth())
@UseGuards(new JwtAuthGuard())
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @ApiCreatedResponse({
    description: 'Successfully adds a new Patient',
    type: Patient,
  })
  @ApiOperation({
    summary: 'This end point creates patient data',
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Headers() headers: any) {
    return this.patientService.create(createPatientDto, headers);
  }
  @ApiOkResponse({
    description: 'Successfully returns all patients',
    type: [Patient],
  })
  @ApiOperation({
    summary:
      'This end point is locked for normal users. Only administrators can access it. This request fetches all patients',
  })
  @Get(':pageWidth/:pageSize')
  findAll(
    @Param('pageWidth') pageWidth: number,
    @Param('pageSize') pageSize: number,
    @Headers() headers: Headers,
  ) {
    return this.patientService.findAll(headers, pageWidth, pageSize);
  }
  @ApiOkResponse({
    description: 'Successfully returns patient',
    type: Patient,
  })
  @ApiOperation({
    summary: 'This end point will fetch patient data with the given id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: Headers) {
    return await this.patientService.findOne(+id, headers);
  }

  @ApiOkResponse({
    description: 'Successfully update patient',
    type: Patient,
  })
  @ApiOperation({
    summary: "This end point will update patient's data with the given id",
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Headers() headers: any,
  ) {
    return this.patientService.update(+id, updatePatientDto, headers);
  }

  @ApiOkResponse({
    description: 'Successfully delete patient',
    type: PatientDeleteSuccessResponse,
  })
  @ApiOperation({
    summary: "This end point will update patient's data with the given id",
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Headers() headers: Headers) {
    return await this.patientService.remove(+id, headers);
  }
}
