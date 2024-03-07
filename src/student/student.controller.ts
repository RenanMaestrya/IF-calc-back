import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':studentId/average')
  calculateAverage(@Param('studentId') studentId: number) {
    return this.studentsService.calculateAverage(studentId);
  }

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: number) {
    return this.studentsService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() student: Promise<Student>) {
    return this.studentsService.createStudent(await student);
  }

  @Put(':id')
  updateStudent(@Param('id') id: number, @Body() updatedStudent: Student) {
    return this.studentsService.updateStudent(id, updatedStudent);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentsService.deleteStudent(id);
  }
}
