import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createObservationDto: CreateObservationDto) {
    return await this.observationService.create(createObservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.observationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateObservationDto: UpdateObservationDto,
  ) {
    return this.observationService.update(+id, updateObservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observationService.remove(+id);
  }
}
