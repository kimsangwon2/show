import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() loginDto: LoginDto, @Body('name') name: string) {
    if (!name) {
      throw new BadRequestException('이름을 입력해주세요.');
    }
    return await this.userService.register(
      loginDto.email,
      loginDto.password,
      name,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@UserInfo() user: User) {
    const { createdAt, point, ...userProfile } = user;
    return { userProfile };
  }
}
