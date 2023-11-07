import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}
    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.find(id);
    }

    @Get(':id/orders')
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getOrdersByUser(id);
    }
}
