import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}
  
  get() {
    return 'Hello World!!'
  }

  async getTasks() {
    const tasksCollection = this.database.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    return tasks;
  }
}
