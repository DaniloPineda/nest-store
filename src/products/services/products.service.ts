import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/product.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class ProductsService extends BaseService<Product> {

  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {
    super(productRepo);
  }

  findAll() {
    return this.productRepo.find();
  }

  find(id: number) {
    return this.getByIdOrThrowNotFoundException({id});
  }

  create(payload: CreateProductDto) {
    const newProd = this.productRepo.create(payload);    
    return this.productRepo.save(newProd);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.getByIdOrThrowNotFoundException({id});
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.getByIdOrThrowNotFoundException({id});
    const deleted = (await this.productRepo.delete(id))?.affected > 0;
    return { deleted, product };
  }
}
