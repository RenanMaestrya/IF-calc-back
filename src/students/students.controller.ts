import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post(':studentId/grades')
  addGrade(
    @Param('studentId') studentId: number,
    @Body('grade') grade: number,
  ) {
    return this.studentsService.addGrade(studentId, grade);
  }

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
  createStudent(@Body() student: Student) {
    return this.studentsService.createStudent(student);
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
