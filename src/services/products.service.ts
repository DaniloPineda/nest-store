import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private nextId = 1;
  private products: Product[] = [{
      id: 1,
      name: 'Product 1',
      description: 'Product 1 desc',
      price: 1200
  }];

  findAll() {
    return this.products;
  }

  find(id: number) {
    const product = this.products.find(x => x.id === id);
    if (!product) throw new NotFoundException(`Product with Id: ${id} was not found`);
    return product;
  }

  create(payload: any) {
    this.nextId += 1;
    const newProd = {
        id: this.nextId,
        ... payload,
    }
    this.products.push(newProd);
    return newProd;
  }

  update(id: number, payload: any) {
    const product = this.find(id);
    if(product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...product, ...payload};
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex(x =>x.id === id);
    if(index === -1) {
      throw new NotFoundException(`Product with Id: ${id} was not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
