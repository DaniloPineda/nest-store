import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    get() {
        return { message: 'Users works!!'}
    }
}
