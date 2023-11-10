import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.get();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
