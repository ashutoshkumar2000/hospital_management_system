import { Length } from 'class-validator';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Observation } from 'src/modules/observation/entities/observation.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patient')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  @Length(8, 50)
  email: string;

  @CreateDateColumn()
  firstVisit: Date;

  @UpdateDateColumn()
  recentVisit: Date;

  @ManyToMany(() => Doctor, (doctor) => doctor.patients)
  @JoinTable()
  doctors: Doctor[];

  @OneToMany(() => Observation, (observation) => observation.patient)
  observations: Observation[];
}
