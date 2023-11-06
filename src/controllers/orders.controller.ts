import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
    @Get()
    get() {
        return { message: 'Orders works!!'}
    }
}
