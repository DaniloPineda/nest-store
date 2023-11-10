import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}


  async findAll() {
    return await this.userModel.find().exec();
  }

  find(id: string) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with Id: ${id} was not found`);
    return user;
  }

  create(payload: CreateUserDto) {
    const item = new this.userModel(payload);
    return item.save();
  }

  update(id: string, payload: UpdateUserDto) {
    const item = this.userModel.findByIdAndUpdate(
      id, {$set: payload }, {new: true}).exec();
    if (!item) throw new NotFoundException(`User with Id: ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  async getOrdersByUser(id: string) {
    const user = this.find(id);
    return {
      date: new Date(),
      products: await this.productsService.findAll(),
      user,
    };
  }
}
