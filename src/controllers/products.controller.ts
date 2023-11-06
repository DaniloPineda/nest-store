import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
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
  get(@Param('id') id: number) {
    return this.producService.find(+id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.producService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any){
    return this.producService.update(+id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.producService.delete(+id)
  }
}
