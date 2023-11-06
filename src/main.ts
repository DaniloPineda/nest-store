import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignore unwanted properties
    forbidNonWhitelisted: true, //block unwanted properties
  }));
  await app.listen(3000);
}
bootstrap();
