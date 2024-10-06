import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5500);
}
bootstrap();
