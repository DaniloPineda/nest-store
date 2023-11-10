import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private producService: ProductsService) {}

  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.producService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.producService.find(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.producService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.producService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.producService.delete(id);
  }
}
