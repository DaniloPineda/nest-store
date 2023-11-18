import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class CategoriesService extends BaseService<Category> {
    
    constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {
        super(categoryRepo)
    }

    findAll() {
        return this.categoryRepo.find();
    }

    async find(id: number){
        return await this.getByIdOrThrowNotFoundException({id});
    }

    create(payload: CreateCategoryDto){
        const category = this.categoryRepo.create(payload);
        return this.categoryRepo.save(category);
    }

    async update(id: number, payload: UpdateCategoryDto) {
        const category = await this.getByIdOrThrowNotFoundException({id});
        return this.categoryRepo.merge(category, payload);
    }

    async delete(id: number) {
        const category = this.getByIdOrThrowNotFoundException({id});
        const deleted = (await this.categoryRepo.delete(id)).affected > 0;
        return { deleted, category };
    }
}
