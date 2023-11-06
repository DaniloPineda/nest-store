import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
    private nextId = 1;

    private customers: Customer[] = [
        {
            id: 1,
            name: 'Jhon',
            lastName: 'Smith',
            phone: '210-234-1111'
        }
    ];

    findAll(): Customer[] {
        return this.customers
    }

    find(id: number): Customer {
        const customer = this.customers.find(b => b.id === id);
        if (!customer) throw new NotFoundException(`Customer with Id: ${id} was not found`);
        return customer;
    }

    create(payload: CreateCustomerDto){
        this.nextId += 1;
        const customer = {id: this.nextId, ... payload};
        this.customers.push(customer);
        return customer;
    }

    update(id: number, payload: UpdateCustomerDto) {
        const customer = this.find(id);
        const index = this.customers.findIndex((item) => item.id === id);
        if(index > -1) {
            this.customers[index] = { ...customer, ...payload};
            return this.customers[index];
        }
        return null;
    }

    delete(id: number) {
        const index = this.customers.findIndex((item) => item.id === id);
        if(index === -1) {
            throw new NotFoundException(`Customer with Id: ${id} was not found`);
        }
        this.customers.splice(index, 1)
        return true;
    }
}
