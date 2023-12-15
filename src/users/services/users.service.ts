import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
    private productsService: ProductsService,
  ) {
    super(userRepo);
  }

  findAll() {
    return this.userRepo.find({ relations: ['customer'] });
  }

  async find(id: number) {
    return await this.getByIdOrThrowNotFoundException({ where: { id: id } });
  }

  async create(payload: CreateUserDto) {
    const user = this.userRepo.create(payload);
    if (payload.customerId) {
      user.customer = await this.customerService.find(payload.customerId);
    }
    return this.userRepo.save(user);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.getByIdOrThrowNotFoundException({
      where: { id: id },
    });
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.getByIdOrThrowNotFoundException({
      where: { id: id },
    });
    const deleted = (await this.userRepo.delete(id)).affected > 0;
    return { deleted, user };
  }

  async getOrdersByUser(id: number) {
    const user = this.find(id);
    return {
      date: new Date(),
      products: await this.productsService.findAll(),
      user,
    };
  }
}
