import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../../users/dtos/customer.dto';
import { Customer } from '../../users/entities/customer.entity';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends BaseService<Customer> {
    constructor(@InjectRepository(Customer) private customerRepo: Repository<Customer>) {
        super(customerRepo);
    }

    findAll(){
        return this.customerRepo.find();
    }

    async find(id: number) {
        return await this.getByIdOrThrowNotFoundException({ where: {id: id} });
    }

    create(payload: CreateCustomerDto){
        const customer =  this.customerRepo.create(payload);
        return this.customerRepo.save(customer);
    }

    async update(id: number, payload: UpdateCustomerDto) {
        const customer = await this.getByIdOrThrowNotFoundException({ where: {id: id} });
        this.customerRepo.merge(customer, payload);
        return this.customerRepo.save(customer);
    }

    async delete(id: number) {
        const customer =  await this.getByIdOrThrowNotFoundException({ where: {id: id} });
        const deleted = (await this.customerRepo.delete(id))?.affected > 0;
        return { deleted, customer };
    }
}
