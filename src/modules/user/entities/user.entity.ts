import { Length } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class Users extends BaseEntity {
  @ApiProperty({
    description: 'Auto generated Id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the User',
    example: 'Vishal Vashisht',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Email of User',
    example: 'vashisht.vishal@xyz.com',
  })
  @Column({ unique: true })
  @Length(8, 50)
  email: string;

  @ApiProperty({
    description: "User's Password",
    example: '$2b$10$1dXNiIMqhbDRMAs.ECygBe33rCFHggDt7ZK.Hld/KSO4/ahASTIn6',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Role of User',
    example: 'patient',
  })
  @Column()
  role: string;

  @ApiProperty({
    description: 'User creation date',
    example: '2020-01-10T18:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'User update date',
    example: '2021-01-10T18:30:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async encryptAndSave(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password || password, salt);
  }
}
