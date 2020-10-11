import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AuthTokenGuard} from "./core/auth/guards/auth-token.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthTokenGuard());
  // app.setGlobalPrefix('/api');
  await app.listen(3000);
}

bootstrap().then();
