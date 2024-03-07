import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ name: 'registration_number', length: 50, nullable: false })
  registrationNumber: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: false })
  dateOfBirth: Date;

  @Column({ length: 100, nullable: false })
  course: string;

  @Column('simple-array', { nullable: true })
  grades: number[];
}
