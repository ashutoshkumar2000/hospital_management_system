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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMedicationDto: CreateTestDto) {
    return await this.TestService.create(createMedicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.TestService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TestService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.TestService.update(+id, UpdateTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TestService.remove(+id);
  }
}
