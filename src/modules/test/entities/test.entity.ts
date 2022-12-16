import { ApiProperty } from '@nestjs/swagger';
import { Observation } from 'src/modules/observation/entities/observation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('test')
export class Test extends BaseEntity {
  @ApiProperty({
    description: 'Auto generated Id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the test',
    example: 'X-ray',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of the test',
    example: 'To identify the bone fracture',
  })
  @Column()
  description: string;

  @ManyToMany(() => Observation, (patient) => patient.tests)
  @JoinTable()
  observations: Observation[];
}
