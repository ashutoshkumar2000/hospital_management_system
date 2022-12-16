import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Auto generated Id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the doctor',
    example: 'Ashutosh Singh',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Email of doctor',
    example: 'singh.ashutosh@xyz.com',
  })
  @Column()
  @Length(8, 50)
  email: string;

  @ApiProperty({
    description: 'Date of joining the hospital',
    example: '2020-01-10T18:30:00.000Z',
  })
  @CreateDateColumn()
  joiningDate: Date;

  @ApiProperty({
    description: 'Consulted patients',
    type: Patient,
    isArray: true,
    example: [
      { id: 1, name: 'patient1' },
      { id: 2, name: 'patient2' },
    ],
  })
  @ManyToMany(() => Patient, (patient) => patient.doctors)
  @JoinTable()
  patients: Patient[];
}
