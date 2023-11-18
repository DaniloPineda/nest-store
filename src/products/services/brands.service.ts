import { Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class BrandsService extends BaseService<Brand> {
    
    constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {
        super(brandRepo);
    }

    findAll() {
        return this.brandRepo.find();
    }

    async find(id: number) {
        return await this.getByIdOrThrowNotFoundException({ id });
    }

    create(payload: CreateBrandDto){
        const brand = this.brandRepo.create(payload)
        return this.brandRepo.save(brand); 
    }

    async update(id: number, payload: UpdateBrandDto) {
        const brand = await this.getByIdOrThrowNotFoundException({ id });
        this.brandRepo.merge(brand, payload);
        return this.brandRepo.save(brand);
    }

    async delete(id: number) {
        const brand = await this.getByIdOrThrowNotFoundException({id});
        const deleted = (await this.brandRepo.delete(id)).affected > 0;
        return { deleted, brand };
    }
}
