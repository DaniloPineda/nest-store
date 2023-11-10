import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}


  async findAll() {
    const orders = await this.orderModel.find()
      .populate(['customer', 'products']);
    return orders;
  }

  find(id: string) {
    const order = this.orderModel.findById(id);
    if (!order) throw new NotFoundException(`Order with Id: ${id} was not found`);
    return order;
  }

  create(payload: CreateOrderDto) {
    const item = new this.orderModel(payload);
    return item.save();
  }

  update(id: string, payload: UpdateOrderDto) {
    const item = this.orderModel.findByIdAndUpdate(id, {$set: payload }, {new: true});
    if (!item) throw new NotFoundException(`Order with Id: ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }

  async getOrdersByOrder(id: string) {
    const order = this.find(id);
    return {
      date: new Date(),
      products: [], //await this.productsService.findAll(),
      order,
    };
  }

  async removeProduct(id: string, productId: string){
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productIds: string[]){
    const order = await this.orderModel.findById(id);
    productIds.forEach((item) => {
      if(order.products.findIndex(x => x.id === item) > -1)
        order.products.push(item);
    });
    return order.save();    
  }
}
