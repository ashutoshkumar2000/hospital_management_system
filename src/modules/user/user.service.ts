import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from 'src/types/error';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async createUser(userData: CreateUserDto): Promise<Users | Error> {
    const user = new Users();
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    user.role = userData.role;

    try {
      return await this.repository.save(user);
    } catch (err) {
      return {
        message: 'Something went wrong',
        error: err.message,
      };
    }
  }

  async getUserByEmail(userMail: GetUserDto): Promise<Users> {
    return this.repository.findOne({ where: { email: userMail.email } });
  }
}
