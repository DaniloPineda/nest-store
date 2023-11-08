import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('TASKS') private tasks: any[]) {}

  getHello(): any[] {
    return this.tasks;
  }
}