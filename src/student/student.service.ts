import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepository: Repository<Student>,
  ) {}

  // addGrade(studentId: number, grade: number): Student {
  //   let student = this.students.find((student) => student.id == studentId);

  //   if (!student) {
  //     student = {
  //       id: studentId,
  //       name: '',
  //       registrationNumber: '',
  //       dateOfBirth: new Date(),
  //       course: '',
  //       grades: [grade],
  //     };
  //     this.students.push(student);
  //   } else {
  //     student.grades.push(grade);
  //   }

  //   return student;
  // }

  async calculateAverage(studentId: number): Promise<number> {
    const student = await this.StudentRepository.findOneOrFail({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    if (!student.grades || student.grades.length === 0) {
      return 0;
    }

    const gradesAsNumbers = student.grades.map((grade) => {
      if (typeof grade === 'string') {
        return parseFloat(grade);
      }
      return grade;
    });

    const sum = gradesAsNumbers.reduce((acc, grade) => acc + grade, 0);

    return sum / gradesAsNumbers.length;
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.StudentRepository.find();
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const student = this.StudentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async createStudent(createStudent: Student): Promise<Student> {
    const student = this.StudentRepository.create(createStudent);
    return await this.StudentRepository.save(student);
  }

  async updateStudent(
    id: number,
    updatedStudent: Student,
  ): Promise<Student | null> {
    const student = await this.getStudentById(id);
    Object.assign(student, updatedStudent);
    return await this.StudentRepository.save(student);
  }

  async deleteStudent(id: number): Promise<{ message: string }> {
    const result = await this.StudentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A student "${id}" was not found`);
    }
    return { message: 'Student successfully deleted' };
  }
}
