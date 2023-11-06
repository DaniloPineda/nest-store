import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
    @Get()
    get() {
        return { message: 'Brands works!!'}
    }
}
