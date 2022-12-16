import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ErrorResponse } from '../swagger-api-responses/ApiResponses';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Observation } from './entities/observation.entity';

@ApiBadRequestResponse({
  description: 'request failed',
  type: ErrorResponse,
})
@ApiTags('Observation')
@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) { }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Successfully adds a new observation',
    type: Observation,
  })
  @ApiOperation({
    summary: 'This end point creates Observation data',
  })
  @Post()
  async create(@Body() createObservationDto: CreateObservationDto) {
    return await this.observationService.create(createObservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Successfully returns a observations',
    type: Observation,
    isArray: true,
  })
  @ApiOperation({
    summary: 'This end point return Observations data',
  })
  @Get()
  async findAll() {
    return await this.observationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Successfully returns a observation',
    type: Observation,
  })
  @ApiOperation({
    summary: 'This end point return Observation data for a given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observationService.findOne(+id);
  }
}
