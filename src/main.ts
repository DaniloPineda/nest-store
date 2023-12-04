import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignore unwanted properties
    forbidNonWhitelisted: true, //block unwanted properties
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('DP Store')
    .setDescription('This is a test project for NEST API creation')
    .setVersion('1.0')
    .build()
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  app.enableCors(); //confgure specific clients

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
