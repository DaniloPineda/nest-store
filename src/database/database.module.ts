import { Global, Module } from '@nestjs/common';

const API_KEY_DEV = 'api-key-dev-12345'
const API_KEY_PROD = 'api-key-prod-12345'

@Global()
@Module({
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV,
        }
    ],
    exports: ['API_KEY']
})
export class DatabaseModule {}
