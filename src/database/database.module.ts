import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from 'src/config';

const API_KEY_DEV = 'api-key-dev-12345';
const API_KEY_PROD = 'api-key-prod-12345';


@Global()
@Module({
  imports: [ 
    MongooseModule.forRootAsync({
      useFactory: async(configService: ConfigType<typeof config>) => {
        const { name, host, port, user, password, connection } = configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user, 
          pass: password, 
          dbName: name,
        }
      },
      inject: [ config.KEY ]
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV,
    },
    {
      provide: 'MONGO',
      useFactory: async(configService: ConfigType<typeof config>) => {
        const { name, host, port, user, password, connection } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const db_client = new MongoClient(uri);
        await db_client.connect();
        return db_client.db(name);
      },
      inject: [ config.KEY ]
    }
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
