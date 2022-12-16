import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Error } from 'src/types/error';
import { ErrorResponse } from '../swagger-api-responses/ApiResponses';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UserService } from './user.service';

@ApiBadRequestResponse({
  description: 'request failed',
  type: ErrorResponse,
})
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @ApiCreatedResponse({
    description: 'Successfully adds a new USer',
    type: Users,
  })
  @ApiOperation({
    summary: 'This end point creates User data',
  })
  @Post('')
  async createUser(
    @Body() createUserRequest: CreateUserDto,
  ): Promise<Users | Error> {
    return await this.userService.createUser(createUserRequest);
  }

  @ApiOkResponse({
    description: 'Successfully returns doctor',
    type: Users,
  })
  @ApiOperation({
    summary: "this endpoint returns Users's data based on given email id",
  })
  @Get(':email')
  async getUser(@Param('email') getUserRequest: string): Promise<Users> {
    return await this.userService.getUserByEmail({ email: getUserRequest });
  }
}
