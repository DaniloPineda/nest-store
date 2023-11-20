import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {
    constructor(private orderItemService: OrderItemService) {}
    
    
    @Post()
    addOrderItem(@Body() payload: CreateOrderItemDto) {
        return this.orderItemService.create(payload);
    }
}
