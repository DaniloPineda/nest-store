import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService extends BaseService<User> {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private productsService: ProductsService) {
        super(userRepo)
    }

    findAll() {
        return this.userRepo.find();
    }

    async find(id: number) {
        return await this.getByIdOrThrowNotFoundException({id});
    }

    create(payload: CreateUserDto){
        const user = this.userRepo.create(payload);
        return this.userRepo.save(user);
    }

    async update(id: number, payload: UpdateUserDto) {
        const user = await this.getByIdOrThrowNotFoundException({id});
        this.userRepo.merge(user, payload);
        return this.userRepo.save(user);
    }

    async delete(id: number) {
        const user = await this.getByIdOrThrowNotFoundException({id});
        const deleted = (await this.userRepo.delete(id)).affected > 0;
        return { deleted, user };
    }

    async getOrdersByUser(id: number) {
        const user = this.find(id);
        return {
            date: new Date(),
            products: await this.productsService.findAll(),
            user
        }
    }
}
