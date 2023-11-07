import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
    private nextId = 1;

    private brands: Brand[] = [
        {
            id: 1,
            image: '',
            name: 'Brand 1'
        }
    ];

    findAll(): Brand[] {
        return this.brands
    }

    find(id: number): Brand {
        const brand = this.brands.find(b => b.id === id);
        if (!brand) throw new NotFoundException(`Brand with Id: ${id} was not found`);
        return brand;
    }

    create(payload: CreateBrandDto){
        this.nextId += 1;
        const brand = {id: this.nextId, ... payload};
        this.brands.push(brand);
        return brand;
    }

    update(id: number, payload: UpdateBrandDto) {
        const brand = this.find(id);
        const index = this.brands.findIndex((item) => item.id === id);
        if(index > -1) {
            this.brands[index] = { ...brand, ...payload};
            return this.brands[index];
        }
        return null;
    }

    delete(id: number) {
        const index = this.brands.findIndex((item) => item.id === id);
        if(index === -1) {
            throw new NotFoundException(`Brand with Id: ${id} was not found`);
        }
        this.brands.splice(index, 1)
        return true;
    }
}
