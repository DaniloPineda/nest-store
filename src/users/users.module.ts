import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';

@Module({
    imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order])],
    controllers: [UsersController, CustomersController, OrdersController],
    providers: [UsersService, CustomersService, OrdersService]
})
export class UsersModule {}
