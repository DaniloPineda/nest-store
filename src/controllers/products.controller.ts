import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    
  @Get()
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number, @Query('brand') brand = 'test') {
    return `Products - limit: ${limit}, offfset: ${offset}, brand: ${brand}`;
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return `Product id: ${id}`;
  }
}
