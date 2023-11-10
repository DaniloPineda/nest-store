import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.find(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getOrdersByUser(id);
  }
}
