import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll() {
    return await this.categoryModel.find().exec()
  }

  find(id: string) {
    const item = this.categoryModel.findById(id).exec();
    if(!item) throw new NotFoundException(`Category with id ${id} was not found`);
    return item;
  }

  create(payload: CreateCategoryDto) {
    const item = new this.categoryModel(payload)
    return item.save();
  }

  update(id: string, payload: UpdateCategoryDto) {
    const item = this.categoryModel.findByIdAndUpdate(
      id, { $set: payload }, { new: true }).exec();
    if(!item) throw new NotFoundException(`Category with id ${id} was not found`);
    return item;
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
