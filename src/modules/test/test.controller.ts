import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}

  @Post()
  async create(@Body() createMedicationDto: CreateTestDto) {
    return await this.TestService.create(createMedicationDto);
  }

  @Get()
  findAll() {
    return this.TestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.TestService.update(+id, UpdateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TestService.remove(+id);
  }
}
