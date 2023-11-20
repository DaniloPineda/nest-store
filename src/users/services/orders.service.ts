import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService extends BaseService<Order> {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Customer) private customerRepo: Repository<Customer>) {
        super(orderRepo);
    }

    getAll() {
        return this.orderRepo.find();
    }

    async get(id: number) {
        return await this.getByIdOrThrowNotFoundException({ where: {id: id}, relations: ['items', 'items.product'] });
    }

    async create(payload: CreateOrderDto) {
        const order = new Order();
        order.customer = await this.customerRepo.findOneBy({ id: payload.customerId });
        return this.orderRepo.save(order);
    }

    async update(id: number, payload: UpdateOrderDto) {
        const order = await this.getByIdOrThrowNotFoundException({ where: {id: id} });
        order.customer = await this.customerRepo.findOneBy({ id: payload.customerId });
        return this.orderRepo.save(order);
    }

    async delete(id: number) {
        const order = this.getByIdOrThrowNotFoundException({ where: {id: id} });
        const deleted = (await this.orderRepo.delete(id))?.affected > 0;
        return { deleted, order }
    }
}
