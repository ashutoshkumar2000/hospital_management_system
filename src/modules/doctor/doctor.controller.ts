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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';
import { ErrorResponse } from '../swagger-api-responses/ApiResponses';
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
@ApiTags('Doctor')
@Controller('doctor')
@UseGuards(new JwtAuthGuard())
@UseGuards(new RoleBasedAuth())
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @ApiCreatedResponse({
    description: 'Successfully adds a new Doctor',
    type: Doctor,
  })
  @ApiOperation({
    summary: "end point to create doctor's data",
  })
  @Post()
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @Headers() headers: any,
  ) {
    return await this.doctorService.create(createDoctorDto, headers);
  }
  @ApiOkResponse({
    description: 'Successfully returns all doctors',
    type: Doctor,
    isArray: true,
  })
  @ApiOperation({
    summary:
      'This end point is locked for normal users. Only administrators can access it. This request fetches all doctors',
  })
  @Get(':pageWidth/:pageSize')
  findAll(
    @Param('pageWidth') pageWidth: number,
    @Param('pageSize') pageSize: number,
    @Headers() headers: Headers,
  ) {
    return this.doctorService.findAll(headers, pageWidth, pageSize);
  }

  @ApiOkResponse({
    description: 'Successfully returns doctor',
    type: Doctor,
  })
  @ApiOperation({
    summary: "this endpoint returns doctor's data based on given id",
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: any) {
    return this.doctorService.findOne(+id, headers);
  }

  @ApiOkResponse({
    description: 'Successfully update doctor',
    type: Doctor,
  })
  @ApiOperation({
    summary: "this endpoint updates the doctor's data based on given id",
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.update(+id, updateDoctorDto);
  }
}
