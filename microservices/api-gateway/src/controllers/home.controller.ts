import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HomeService } from '../services/home.service';

@Controller('home')
@ApiUseTags('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('/')
  async index() {
    const { payload } = await this.homeService.home({});
    return {
      status: 'ok',
      payload,
    };
  }
}
