import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Auto generated Id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the patient',
    example: 'Vishal Vashisht',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1987-01-05T18:30:00.000Z',
  })
  @Column()
  dob: Date;

  @ApiProperty({
    description: 'Email of patient',
    example: 'vashisht.vishal@xyz.com',
  })
  @Column()
  @Length(8, 50)
  email: string;
  @ApiProperty({
    description: 'Date of first visit',
    example: '2020-01-10T18:30:00.000Z',
  })
  @CreateDateColumn()
  firstVisit: Date;

  @ApiProperty({
    description: 'Date of recent visit',
    example: '2022-05-02T18:30:00.000Z',
  })
  @UpdateDateColumn()
  recentVisit: Date;

  @ApiProperty({
    description: 'Consulting doctors',
    type: Doctor,
    isArray: true,
    example: [
      { id: 1, name: 'Doctor1' },
      { id: 2, name: 'Doctor2' },
    ],
  })
  @ManyToMany(() => Doctor, (doctor) => doctor.patients)
  @JoinTable()
  doctors: Doctor[];

  @ApiProperty({
    description: 'Observations',
    type: Observation,
    isArray: true,
    example: [
      { id: 1, name: 'Observation1' },
      { id: 2, name: 'Observation2' },
    ],
  })
  @OneToMany(() => Observation, (observation) => observation.patient)
  observations: Observation[];
}
