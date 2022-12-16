import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '../swagger-api-responses/ApiResponses';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiBadRequestResponse({
  description: 'request failed',
  type: ErrorResponse,
})
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({
    type: CreateAuthDto,
    description: 'Login credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }
}
