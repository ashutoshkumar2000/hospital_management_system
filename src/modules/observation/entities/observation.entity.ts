import { ApiProperty } from '@nestjs/swagger';
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
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('observation')
export class Observation extends BaseEntity {
  @ApiProperty({
    description: 'Auto generated Id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the observation',
    example: 'high fever',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Name of the report carried out',
    example: 'covid +ve',
  })
  @Column()
  report: string;

  @ApiProperty({
    description: 'Date of the test',
    example: '1987-01-05T18:30:00.000Z',
  })
  @CreateDateColumn()
  date: Date;

  @ApiProperty({
    description: 'Whether test done by doctor or pathology',
    example: true,
  })
  @Column({ default: true, type: 'boolean' })
  isObservedByDoctor: boolean;

  @ManyToMany(() => Test, (test) => test.observations)
  @JoinTable()
  tests: Test[];

  @ManyToOne(() => Patient, (patient) => patient.observations)
  patient: Patient;
}
