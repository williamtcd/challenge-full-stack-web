import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    const exitHandler = async () => {
      await this.$disconnect();
      await app.close();
    };

    process.on('beforeExit', exitHandler);
    process.on('exit', exitHandler);
    process.on('SIGINT', exitHandler);
    process.on('SIGTERM', exitHandler);
    process.on('SIGUSR2', exitHandler);
  }
}