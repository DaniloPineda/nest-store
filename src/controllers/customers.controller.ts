import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { CustomersService } from 'src/services/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}
    
  @Get()
  getAll(){
    return  this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.find(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto){
    return this.customersService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.delete(id)
  }
}
