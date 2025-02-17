import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdatePutStudentDTO } from './dto/update-put-student.dto';
import { UpdatePatchStudentDTO } from './dto/update-patch-student.dto';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() data: CreateStudentDTO) {
    return this.studentService.create(data);
  }

  @Get()
  async list() {
    return this.studentService.list();
  }

  @Get(':id')
  async read(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.read(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutStudentDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.studentService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchStudentDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.studentService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.delete(id);
  }
}
