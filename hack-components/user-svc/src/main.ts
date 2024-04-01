import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3001',
      package: 'user_svc',
      protoPath: join(__dirname, './proto/user_svc.proto')
    }
  })
  app.listen();
}
bootstrap();
