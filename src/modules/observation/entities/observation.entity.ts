import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Test } from 'src/modules/test/entities/test.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('observation')
export class Observation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  report: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: true, type: 'boolean' })
  isObservedByDoctor: boolean;

  @ManyToMany(() => Test, (test) => test.observations)
  @JoinTable()
  tests: Test[];

  @ManyToOne(() => Patient, (patient) => patient.observations)
  patient: Patient;
}
