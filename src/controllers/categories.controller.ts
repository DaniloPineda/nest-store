import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    @Get(':id/product/:productId')
    getCategory(@Param('id') id: number, @Param('productId') productId: number) {
      return `Category id: ${id}, Product id: ${productId}`;
    }
}
