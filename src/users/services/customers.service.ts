import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../../users/dtos/customer.dto';
import { Customer } from '../../users/entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

  async findAll() {
    return await this.customerModel.find().exec();
  }

  find(id: string) {
    const customer = this.customerModel.findById(id)
    if (!customer) throw new NotFoundException(`Customer with Id: ${id} was not found`);
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const item = new this.customerModel(payload)
    return item.save();
  }

  update(id: string, payload: UpdateCustomerDto) {
    const item = this.customerModel.findByIdAndUpdate(
      id, { $set: payload }, { new: true }).exec(); 
    if (!item) throw new NotFoundException(`Customer with id ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.customerModel.findByIdAndRemove(id);
  }
}
