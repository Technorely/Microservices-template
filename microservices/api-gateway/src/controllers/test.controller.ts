import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { ApiUseTags } from '@nestjs/swagger';
import { TestService } from '../services/test.service';
import { MicroResponse } from '../types';
import { RecaptchaGuard } from '../guards/recaptcha.guard';

/**
 * Test controller
 * for development purposes only
 */
@Controller('test')
@ApiUseTags('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  async index(): Promise<MicroResponse> {
    const payload = await this.testService.createModel({
      first_name: 'joh',
      last_name: 'doe',
      email: 'johdoe@example.com',
      // password: '1234567890qwertyuiop',
      hashed_password: '1234567890qwertyuiop',
      role_id: 1,
    });
    return {
      status: 'ok',
      payload,
    };
  }

  @Post('/recaptcha')
  @UseGuards(RecaptchaGuard)
  async recaptcha(): Promise<MicroResponse> {
    return {
      status: 'ok',
      payload: { message: 'recaptcha: access granted' },
    };
  }
}
