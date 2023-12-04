import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from 'src/products/dtos/product.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(private producService: ProductsService) {  }
    
  @Get()
  getAll(
    @Query() params: FilterProductDto) {
    return  this.producService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.producService.find(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.producService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto){
    return this.producService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.producService.delete(id)
  }

  @Put(':id/category/:categoryId')
  addProductCategory(@Param('id', ParseIntPipe) id: number, 
  @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.producService.addProductCategory(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  removeProductCategory(@Param('id', ParseIntPipe) id: number, 
  @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.producService.removeProductCategory(id, categoryId);
  }
}
