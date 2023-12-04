import { Injectable } from '@nestjs/common';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from 'src/products/dtos/product.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, In, Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService extends BaseService<Product> {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
    @InjectRepository(Category) private categoryRepo: Repository<Category>) {
    super(productRepo);
  }

  findAll(params?: FilterProductDto) {
    let query: FindManyOptions<Product> = { relations: ['brand'] };
    if(params) {
      query.take = params.limit;
      query.skip= params.offset;
      if(params.minPrice && params.maxPrice) {
        query.where = { price: Between(params.minPrice, params.maxPrice) }
      }
    }
    return this.productRepo.find(query);
  }

  find(id: number) {
    return this.getByIdOrThrowNotFoundException({ where: {id: id}, relations: ['brand','categories'] });
  }

  async create(payload: CreateProductDto) {
    const newProd = this.productRepo.create(payload);
    if(payload.brandId){
      newProd.brand = await this.brandService.find(payload.brandId); 
    }
    if(payload.categoryIds){
      newProd.categories = await this.categoryRepo.findBy({ id: In(payload.categoryIds) });
    }
    return this.productRepo.save(newProd);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.getByIdOrThrowNotFoundException({ where: {id: id} });
    if(payload.brandId){
      product.brand = await this.brandService.find(payload.brandId); 
    }
    if(payload.categoryIds){
      product.categories = await this.categoryRepo.findBy({ id: In(payload.categoryIds) });
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.getByIdOrThrowNotFoundException({ where: {id: id} });
    const deleted = (await this.productRepo.delete(id))?.affected > 0;
    return { deleted, product };
  }

  async addProductCategory(productId: number, categoryId: number) {
    const product = await this.find(productId);
    const category = await this.categoryRepo.findOneBy({id: categoryId});
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeProductCategory(productId: number, categoryId: number) {
    const product = await this.find(productId);
    product.categories = product.categories.filter(({id}) => id !== categoryId);
    return this.productRepo.save(product);
  }
}
