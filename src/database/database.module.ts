import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config'
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
	imports: [ 
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigType<typeof config>) => {
				// const {user, host, dbName, password, port } = configService.postgres;
				const {user, host, dbName, password, port } = configService.mysql;
				return {
					// type: 'postgres',
					type: 'mysql',
					synchronize: true,
					autoLoadEntities: true,
					host, port, username: user, database: dbName, password,
					// entities: ["entities/*.ts"],
					// migrations:[ "migrations/*.ts" ]
				};
			},
			inject: [ config.KEY ]
		}),
	 ],
	providers: [],
	exports: [ TypeOrmModule ]
})
export class DatabaseModule {}
