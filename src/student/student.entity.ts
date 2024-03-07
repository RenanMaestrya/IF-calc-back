import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column('simple-array', { nullable: true })
  grades: number[];
}
