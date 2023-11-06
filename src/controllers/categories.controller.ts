import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    @Get(':id/product/:productId')
    get(@Param('id') id: number, @Param('productId') productId: number) {
      return { message: `Category id: ${id}, Product id: ${productId}`}
    }
}
