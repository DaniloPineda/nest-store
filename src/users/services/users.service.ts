import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class UsersService {

    constructor(
        private productsService: ProductsService, 
        @Inject(config.KEY) private configService: ConfigType<typeof config>) {}

    private nextId = 1;

    private users: User[] = [
        {
            id: 1,
            email: 'user1@test.com',
            password: 'unS@f3P@$$w0rd',
            role: '',
        }
    ];

    findAll(): User[] {
        console.log(this.configService.database);
        return this.users
    }

    find(id: number): User {
        const user = this.users.find(b => b.id === id);
        if (!user) throw new NotFoundException(`User with Id: ${id} was not found`);
        return user;
    }

    create(payload: CreateUserDto){
        this.nextId += 1;
        const user = {id: this.nextId, ... payload};
        this.users.push(user);
        return user;
    }

    update(id: number, payload: UpdateUserDto) {
        const user = this.find(id);
        const index = this.users.findIndex((item) => item.id === id);
        if(index > -1) {
            this.users[index] = { ...user, ...payload};
            return this.users[index];
        }
        return null;
    }

    delete(id: number) {
        const index = this.users.findIndex((item) => item.id === id);
        if(index === -1) {
            throw new NotFoundException(`User with Id: ${id} was not found`);
        }
        this.users.splice(index, 1)
        return true;
    }

    getOrdersByUser(id: number): Order {
        const user = this.find(id);
        return {
            date: new Date(),
            products: this.productsService.findAll(),
            user
        }
    }
}
