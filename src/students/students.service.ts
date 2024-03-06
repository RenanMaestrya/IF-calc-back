import { Injectable } from '@nestjs/common';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  addGrade(studentId: number, grade: number): Student {
    let student = this.students.find((student) => student.id === studentId);

    if (!student) {
      student = {
        id: studentId,
        name: '',
        registrationNumber: '',
        dateOfBirth: new Date(),
        course: '',
        grades: [grade],
      };
      this.students.push(student);
    } else {
      student.grades.push(grade);
    }

    return student;
  }

  calculateAverage(studentId: number): number {
    const student = this.students.find((student) => student.id === studentId);

    if (student) {
      const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
      return sum / student.grades.length;
    }

    return 0;
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student {
    return this.students.find((student) => student.id === id);
  }

  createStudent(student: Student): Student {
    student.id = this.students.length + 1;
    this.students.push(student);
    return student;
  }

  updateStudent(id: number, updatedStudent: Student): Student {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students[index] = { ...updatedStudent, id };
      return this.students[index];
    }
    return null;
  }

  deleteStudent(id: number): Student {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      const deletedStudent = this.students[index];
      this.students.splice(index, 1);
      return deletedStudent;
    }
    return null;
  }
}
