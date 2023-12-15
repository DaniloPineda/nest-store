import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(payload: CreateOrderItemDto) {
    const item = new OrderItem();
    item.order = await this.orderRepo.findOneBy({ id: payload.orderId });
    item.product = await this.productRepo.findOneBy({ id: payload.productId });
    item.quantity = payload.quantity;
    return this.orderItemRepo.save(item);
  }
}
