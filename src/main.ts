import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  const port = 3000;
  await app.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}
bootstrap();
