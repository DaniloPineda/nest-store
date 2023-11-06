import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dto';
import { BrandsService } from 'src/services/brands.service';

@Controller('brands')
export class BrandsController {

    constructor(private brandsService: BrandsService) {}
    
    @Get()
    getAll(){
      return  this.brandsService.findAll();
    }
  
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
      return this.brandsService.find(id);
    }
  
    @Post()
    create(@Body() payload: CreateBrandDto) {
      return this.brandsService.create(payload);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto){
      return this.brandsService.update(id, payload)
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.brandsService.delete(id)
    }
}
