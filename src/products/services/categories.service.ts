import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private nextId = 1;

  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  find(id: number): Category {
    const category = this.categories.find((b) => b.id === id);
    if (!category)
      throw new NotFoundException(`Category with Id: ${id} was not found`);
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.nextId += 1;
    const category = { id: this.nextId, ...payload };
    this.categories.push(category);
    return category;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.find(id);
    const index = this.categories.findIndex((item) => item.id === id);
    if (index > -1) {
      this.categories[index] = { ...category, ...payload };
      return this.categories[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with Id: ${id} was not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
