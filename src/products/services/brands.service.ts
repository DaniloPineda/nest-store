import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandsModel: Model<Brand>) {}

  async findAll() {
    return await this.brandsModel.find().exec();
  }

  find(id: string) {
    const brand = this.brandsModel.findById(id);
    if (!brand) throw new NotFoundException(`Brand with Id: ${id} was not found`);
    return brand;
  }

  create(payload: CreateBrandDto) {
    const item = new this.brandsModel(payload);
    return item.save();
  }

  update(id: string, payload: UpdateBrandDto) {
    const item = this.brandsModel.findByIdAndUpdate(
      id, {$set: payload}, {new:true}).exec();
    if (!item) throw new NotFoundException(`Brand with Id: ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.brandsModel.findByIdAndRemove(id);
  }
}
