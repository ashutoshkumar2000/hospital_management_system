import { Length } from 'class-validator';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('doctor')
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Length(8, 50)
  email: string;

  @CreateDateColumn()
  joiningDate: Date;

  @ManyToMany(() => Patient, (patient) => patient.doctors)
  @JoinTable()
  patients: Patient[];
}
