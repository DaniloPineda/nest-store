import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService extends BaseService<Order> {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {
        super(orderRepo);
    }

    getAll() {
        return this.orderRepo.find();
    }

    async get(id: number) {
        return await this.getByIdOrThrowNotFoundException({ id })
    }

    create(payload: CreateOrderDto) {
        const order = this.orderRepo.create(payload);
        return this.orderRepo.save(order);
    }

    async update(id: number, payload: UpdateOrderDto) {
        const order = await this.getByIdOrThrowNotFoundException({ id });
        this.orderRepo.merge(order, payload);
        return this.orderRepo.save(order);
    }

    async delete(id: number) {
        const order = this.getByIdOrThrowNotFoundException({ id });
        const deleted = (await this.orderRepo.delete(id))?.affected > 0;
        return { deleted, order }
    }
}
