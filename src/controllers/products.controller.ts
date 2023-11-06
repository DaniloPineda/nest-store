import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {

  constructor(private producService: ProductsService) {  }
    
  @Get()
  getAll(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand = 'test') {
    return  this.producService.findAll();
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
}
