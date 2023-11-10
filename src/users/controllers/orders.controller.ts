import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { AddProductsToOrderDto, CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {}
  @Get()
  get() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.find(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put()
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }

  @Delete()
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.delete(id);
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id', MongoIdPipe) id: string, 
    @Param('productId', MongoIdPipe) productId: string) {
    return this.ordersService.removeProduct(id, productId);
  }

  @Put(':id/products')
  addProductss(
    @Param('id', MongoIdPipe) id: string, 
    @Body() payload: AddProductsToOrderDto) {
    return this.ordersService.addProducts(id, payload.productIds);
  }
}
