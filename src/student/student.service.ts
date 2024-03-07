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
    const existingStudent = await this.StudentRepository.findOne({
      where: { name: createStudent.name },
    });

    interface StudentWithAverage extends Student {
      average: number;
    }

    if (existingStudent) {
      const updatedStudent = { ...existingStudent, ...createStudent };
      const updated = await this.StudentRepository.save(updatedStudent);
      const average = await this.calculateAverage(updated.id);
      return { ...updated, average } as StudentWithAverage;
    } else {
      const newStudent = await this.StudentRepository.save(createStudent);
      const average = await this.calculateAverage(newStudent.id);
      return { ...newStudent, average } as StudentWithAverage;
    }
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
