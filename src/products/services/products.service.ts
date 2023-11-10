import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>){ }


  async findAll(params?: FilterProductsDto) {
    if(params){
      const filters: FilterQuery<Product> = {};
      const {limit, offset, minPrice, maxPrice} = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice};
      }
      return await this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec()
    }
    return await this.productModel.find().populate('brand').exec()
  }

  async find(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product)
      throw new NotFoundException(`Product with Id: ${id} was not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const item = new this.productModel(payload);
    return item.save();
  }

  update(id: string, payload: UpdateProductDto) {
    const item = this.productModel.findByIdAndUpdate(
      id, { $set: payload }, { new: true }).exec();
    if(!item) throw new NotFoundException(`Product with Id: ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }
}
